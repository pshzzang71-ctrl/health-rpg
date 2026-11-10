// 건강 RPG 클라우드 백업
// 폰에서 복구 코드로 암호화한 기록(암호문)만 받아서 Vercel Blob에 저장하고 돌려줍니다.
// 서버는 복구 코드도, 기록 내용도 알 수 없어요.
//   POST /api/backup        { id, data:{v,z,iv,ct,at} }  → 저장
//   GET  /api/backup?id=…   → 저장된 암호문
//   GET  /api/backup?ping=1 → 저장소 연결 여부
import { put, get } from '@vercel/blob';

const ID_RE = /^[0-9a-f]{64}$/;
const B64_RE = /^[A-Za-z0-9+/=]+$/;
const MAX = 900 * 1024;
const pathOf = id => `hrpg-backups/${id}.json`;
let ACCESS = process.env.BLOB_ACCESS === 'public' ? 'public' : 'private';

const json = (status, obj) => new Response(JSON.stringify(obj), {
  status,
  headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
});
const isNotFound = e => !!e && (e.name === 'BlobNotFoundError' || (e.constructor && e.constructor.name === 'BlobNotFoundError') || /not.?found/i.test(String(e.message)));
const isConfig = e => /token|credential|configur|unauthori|forbidden|oidc|store/i.test(String(e && e.message));

// 저장소가 비공개(private)로 만들어졌는지 공개(public)로 만들어졌는지 몰라도 동작하도록 두 방식을 차례로 시도
async function withAccess(fn) {
  let first;
  for (const a of [ACCESS, ACCESS === 'private' ? 'public' : 'private']) {
    try { const r = await fn(a); ACCESS = a; return r; }
    catch (e) { if (isNotFound(e)) { ACCESS = a; return null; } first = first || e; }
  }
  throw first;
}

async function readBlob(id) {
  const r = await withAccess(a => get(pathOf(id), { access: a, useCache: false }));
  if (!r || (r.statusCode && r.statusCode !== 200) || !r.stream) return null;
  return await new Response(r.stream).text();
}

export async function GET(request) {
  const url = new URL(request.url);
  if (url.searchParams.has('ping')) {
    try { await readBlob('0'.repeat(64)); return json(200, { ok: true, ready: true }); }
    catch (e) { return json(200, { ok: true, ready: false, error: isConfig(e) ? 'not configured' : 'server error' }); }
  }
  const id = url.searchParams.get('id') || '';
  if (!ID_RE.test(id)) return json(400, { error: 'bad id' });
  try {
    const text = await readBlob(id);
    if (!text) return json(404, { error: 'not found' });
    return json(200, { ok: true, data: JSON.parse(text) });
  } catch (e) {
    return json(isConfig(e) ? 503 : 500, { error: isConfig(e) ? 'not configured' : 'server error' });
  }
}

export async function POST(request) {
  if ((+request.headers.get('content-length') || 0) > MAX) return json(413, { error: 'too large' });
  let body;
  try {
    const t = await request.text();
    if (t.length > MAX) return json(413, { error: 'too large' });
    body = JSON.parse(t);
  } catch { return json(400, { error: 'bad json' }); }
  const { id, data } = body || {};
  if (!ID_RE.test(String(id || '')) || !data || typeof data.ct !== 'string' || typeof data.iv !== 'string'
    || !B64_RE.test(data.ct) || !B64_RE.test(data.iv) || data.iv.length > 32) return json(400, { error: 'bad request' });
  const clean = { v: 1, z: data.z ? 1 : 0, iv: data.iv, ct: data.ct, at: Number(data.at) || Date.now() };
  try {
    await withAccess(a => put(pathOf(id), JSON.stringify(clean), {
      access: a, allowOverwrite: true, addRandomSuffix: false, contentType: 'application/json', cacheControlMaxAge: 60,
    }));
    return json(200, { ok: true, at: clean.at });
  } catch (e) {
    return json(isConfig(e) ? 503 : 500, { error: isConfig(e) ? 'not configured' : 'server error' });
  }
}
