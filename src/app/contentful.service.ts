import { Injectable } from '@angular/core';
import { createClient, Entry } from 'contentful';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private cdaClient = createClient({
    space: environment.contentful.space,
    accessToken: environment.contentful.accessToken
  });

  constructor() { }

  async getTimelineItems(query?: object): Promise<Entry<any>[]> {
    const res = await this.cdaClient.getEntries(Object.assign({
      content_type: environment.contentful.contentTypeIds.timelineItem,
      locale: '*'
    }, query));
    return res.items;
  }
}
