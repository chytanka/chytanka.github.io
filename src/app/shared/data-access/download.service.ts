import { Injectable } from '@angular/core';
import { CompositionEpisode, CompositionImage } from '../../@site-modules/@common-read'

enum DownloadStatus {
  Downloading = "downloading",
  Paused = "paused",
  Error = "error",
  Done = "done",
  Queued = "queued"
}

type DownloadQueue<T> = {
  id: string;
  status: DownloadStatus;
  object: T;
  dateAdded: Date;
  dateDownloaded: Date | undefined;
}

interface DownloadCompositionImage extends CompositionImage {
  image: number[]
  status: DownloadStatus;
}
interface DowloadCompositionEpisode extends CompositionEpisode {
  images: DownloadCompositionImage[]
}


@Injectable({
  providedIn: 'root'
})
export class DownloadService {
  /**
   * -[ ] add to queue
   * -[ ] dowload queue
   * -[ ] save to db
   * -[ ] 
   */

  queue: DownloadQueue<CompositionEpisode>[] = []

  constructor() { }

  map(ep: CompositionEpisode): DowloadCompositionEpisode {
    return {
      title: ep.title,
      chapter: ep.chapter,
      episode: ep.episode,
      extra: ep.extra,
      mangaId: ep.mangaId,
      nsfw: ep.nsfw,
      part: ep.part,
      volume: ep.volume,
      images: ep.images.map(img => {
        return {
          image: [],
          status: DownloadStatus.Queued,
          src: img.src,
          alt: img.alt,
          height: img.height,
          nsfw: img.nsfw,
          size: img.size,
          type: img.type,
          width: img.width
        }

      })
    }
  }

  addToQueue(episode: CompositionEpisode, id: string) {
    const qi = this.getFromQueue(id)
    if (qi) return;
    this.queue.push(
      {
        id,
        object: this.map(episode),
        status: DownloadStatus.Queued,
        dateAdded: new Date(),
        dateDownloaded: undefined
      })
  }

  getFromQueue(id: string) {
    const result = this.queue.filter(e => e.id == id)

    return result[0] ?? undefined;
  }
}
