import { inject, Injectable } from '@angular/core';
import { Title, Meta } from '@angular/platform-browser';
import { Base64 } from '../utils/base64';

@Injectable({
  providedIn: 'root'
})
export class MetaTagsService {
  title = inject(Title)
  meta = inject(Meta)

  constructor() { }

  setTitle(title: string) {
    this.title.setTitle(title)

    this.meta.updateTag({ name: 'title', content: title })
    this.meta.updateTag({ name: 'twitter:title', content: title })
    this.meta.updateTag({ property: 'og:title', content: title })
  }

  setDesc(desc: string) {
    this.meta.updateTag({ name: 'description', content: desc })
    this.meta.updateTag({ name: 'twitter:description', content: desc })
    this.meta.updateTag({ property: 'og:description', content: desc })
  }

  removeAdult() {
    this.meta.removeTag(`name='rating'`)
  }

  setAdult() {
    this.removeAdult();
    this.meta.addTag({ name: 'rating', content: 'adult' })
  }

  setImage(src: string, title: string, author: string, copyright = "mangadex") {
    const metaImageHost = `https://si.chytanka.ink`
    const jsonparams = JSON.stringify({
      title:title,
      author: author,
      copyright: copyright
    })
    const imageUrl = `${metaImageHost}/${Base64.toBase64(src)}/${Base64.toBase64(jsonparams)}.jpg`
    this.setMetaImage(imageUrl)    
  }

  setMetaImage(imageUrl: string, title: string = 'Chytanka meta image') {
    this.meta.updateTag({ name: 'twitter:image:src', content: imageUrl })
    this.meta.updateTag({ property: 'og:image', content: imageUrl })
    this.meta.updateTag({ property: 'og:image:url', content: imageUrl })
    this.meta.updateTag({ property: 'og:image:secure_url', content: imageUrl })
    this.meta.updateTag({ property: 'og:image:width', content: '1200' })
    this.meta.updateTag({ property: 'og:image:height', content: '630' })
    this.meta.updateTag({ property: 'og:image:type', content: 'image/png' })
    this.meta.updateTag({ property: 'og:image:alt', content: title })
  }

  setTwiter() {
    this.meta.updateTag({ name: 'twitter:site', content: '@chytanka_ink' })
    this.meta.updateTag({ name: 'twitter:domain', content: 'chytanka.ink' })
    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' })
  }

  setOg() {
    this.meta.updateTag({ property: 'og:site_name', content: 'Chytanka' })
    this.meta.updateTag({ property: 'og:locale', content: 'uk_UA' })
    this.meta.updateTag({ property: 'og:type', content: 'object' })
  }

  setOgUrl(url: string) {
    this.meta.updateTag({ property: 'og:url', content: url })
  }
}
