const BASE_URL = '/api'

async function request<T>(url: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${url}`, {
    headers: { 'Content-Type': 'application/json' },
    ...options,
  })
  if (!res.ok) throw new Error(`API Error: ${res.status} ${res.statusText}`)
  return res.json() as Promise<T>
}

// ─── 類型定義 ──────────────────────────────────────────────────────────────────

export interface Activity {
  id: number;
  name: string;
  startTime: string;
  endTime: string;
  isActive: number;
  cmsList: any[];
}

// export interface Article {
//   id: number
//   title: string
//   status: 'published' | 'draft'
//   createdAt: string
//   cmsList: any[]
// }

// export interface Survey {
//   id: number
//   title: string
//   status: 'active' | 'closed'
//   respondents: number
//   createdAt: string
// }

// json-server 分頁回應的 Header 不帶 total，需搭配 _start/_end 並從 X-Total-Count 讀取
export interface PaginatedResult<T> {
  data: T[]
  total: number
}

// ─── 通用分頁查詢參數 ──────────────────────────────────────────────────────────

interface ListParams {
  page?: number
  pageSize?: number
  sortKey?: string
  sortOrder?: 'asc' | 'desc'
}

function buildQuery(params: ListParams & Record<string, any>): string {
  const { page = 1, pageSize = 10, sortKey, sortOrder, ...rest } = params
  const start = (page - 1) * pageSize
  const q = new URLSearchParams()
  q.set('_start', String(start))
  q.set('_limit', String(pageSize))
  if (sortKey) {
    q.set('_sort', sortKey)
    q.set('_order', sortOrder ?? 'asc')
  }
  Object.entries(rest).forEach(([key, val]) => {
    if (val !== undefined && val !== null && val !== '') {
      q.set(key, String(val))
    }
  })
  return q.toString()
}

async function fetchWithPagination<T>(path: string, qs: string): Promise<PaginatedResult<T>> {
  const res = await fetch(`${BASE_URL}${path}?${qs}`, {
    headers: { 'Content-Type': 'application/json' },
  })
  if (!res.ok) throw new Error(`API Error: ${res.status}`)
  const total = Number(res.headers.get('X-Total-Count') ?? 0)
  const data: T[] = await res.json()
  return { data, total }
}

// ─── 活動管理 (Activity) ───────────────────────────────────────────────────────

export const activityApi = {
  getList(params: ListParams) {
    return fetchWithPagination<Activity>('/activities', buildQuery(params))
  },
  create(body: Omit<Activity, 'id'>) {
    return request<Activity>('/activities', { method: 'POST', body: JSON.stringify(body) })
  },
  update(id: number, body: Partial<Activity>) {
    return request<Activity>(`/activities/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
  },
  remove(id: number) {
    return request<void>(`/activities/${id}`, { method: 'DELETE' })
  },
}

// ─── 文章管理 (Article) ───────────────────────────────────────────────────────

// export const articleApi = {
//   getList(params: ListParams) {
//     return fetchWithPagination<Article>('/articles', buildQuery(params))
//   },
//   getOne(id: number) {
//     return request<Article>(`/articles/${id}`)
//   },
//   create(body: Omit<Article, 'id'>) {
//     return request<Article>('/articles', { method: 'POST', body: JSON.stringify(body) })
//   },
//   update(id: number, body: Partial<Article>) {
//     return request<Article>(`/articles/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
//   },
//   remove(id: number) {
//     return request<void>(`/articles/${id}`, { method: 'DELETE' })
//   },
// }

// ─── 問卷管理 (Survey) ────────────────────────────────────────────────────────

// export const surveyApi = {
//   getList(params: ListParams) {
//     return fetchWithPagination<Survey>('/surveys', buildQuery(params))
//   },
//   create(body: Omit<Survey, 'id'>) {
//     return request<Survey>('/surveys', { method: 'POST', body: JSON.stringify(body) })
//   },
//   update(id: number, body: Partial<Survey>) {
//     return request<Survey>(`/surveys/${id}`, { method: 'PATCH', body: JSON.stringify(body) })
//   },
//   remove(id: number) {
//     return request<void>(`/surveys/${id}`, { method: 'DELETE' })
//   },
// }
