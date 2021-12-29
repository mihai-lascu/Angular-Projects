import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { County } from './kahn-filter.component'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

interface CountyAPI {
	auto: string
	nume: string
}

@Injectable({
	providedIn: 'root',
})
export class KahnFilterService {
	constructor(private httpClient: HttpClient) {}

	getCounties(): Observable<County[]> {
		return this.httpClient.get<CountyAPI[]>(`https://roloca.coldfuse.io/judete`).pipe(map((res) => res.map((county) => ({ name: county.nume, auto: county.auto }))))
	}
}
