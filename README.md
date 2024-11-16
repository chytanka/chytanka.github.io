# Chytanka

**Chytanka** is a versatile and user-friendly PWA for reading manga, comics, and other visual stories. Whether you prefer to read from popular online platforms, your own server, or local files, Chytanka is here to enhance your reading experience.

## Features

### 🖥️ **Read Episodes Online**

Chytanka supports opening episodes from the following platforms:

- [x] [Blankary](https://blankary.com)
- [x] [Comick](https://comick.io)
- [x] [Imgur](https://imgur.com)
- [x] [Mangadex](https://mangadex.org)
- [x] [Nhentai](https://nhentai.net)
- [x] [Pixiv](https://pixiv.net) 
- [x] [Reddit](https://reddit.com)
- [x] [Telegra.ph](https://telegra.ph) 
- [x] [Yande.re Pool](https://yande.re/pool)
- [x] [Zenko](https://zenko.online)
  
### 🌐 **Custom JSON API**

Chytanka can open episodes from any custom JSON API returning the following format:

```json
{
"title": "Title of the episode",
"nsfw": false,
"images": [
  {
    "src": "full-link-to-image-1"
  },
  {
    "src": "full-link-to-image-2"
  },
  {
    "src": "full-link-to-image-n"
  }
]
}
```

### 📚 **Create and Share Readlists**

Compile a readlist using [Chytanka Readlist Creator](https://chytanka.ink/list):

1. Paste supported links into the input field.
2. Edit titles (optional; automatic retrieval supported).
3. Generate and publish a JSON readlist on Rentry, Gist, or your server.
4. Use the generated link to start reading with your custom readlist.

### 📂 **Open Local Files**

Chytanka supports opening the following file formats from your device:

- [x] ZIP/CBZ
- [x] PDF
- [x] MOBI
- [ ] DJVU
- [ ] RAR/CBR

### 📖 **Three Reading Modes**

1. **Vertical**: Perfect for webtoons.
2. **Horizontal (RTL)**: Best for manga.
3. **Horizontal (LTR)**: Ideal for comics.

### 🌓 **Blue Light Filter**

Read comfortably at night with Chytanka's built-in blue light filter.

### 📱 **Responsive Viewing**

- In horizontal mode with landscape orientation: view two pages side by side.
- In portrait orientation: view one page at a time.

### 🖥️ **Fullscreen Mode**

Immerse yourself in reading with a fullscreen option.

### 🕒 **Viewing History**

- [x] Tracks history of supported links.
- [ ] File history support is planned.

### ⌨️ **Keyboard Shortcuts**

#### On the Start Page:

- `F1` — Open FAQ
- `F2` — Open Settings
- `Ctrl+H` — Open History
- `Ctrl+O` — Open File

#### While Reading:

- `A`, `D`, `ArrowLeft`, `ArrowRight` — Navigate pages in horizontal mode
- `W`, `S`, `ArrowUp`, `ArrowDown` — Navigate pages in vertical mode
- `Ctrl+O` — Open File
- `Ctrl+E` — Share (copy link or embed code)
- `F` — Toggle Fullscreen

### 🔞 **NSFW Content Warning**

If supported by the API, Chytanka warns users about NSFW content.

### 🖇️ **Embed Chytanka on Your Website**

Embed Chytanka using an iframe and interact with it via `postMessage`. Learn more in the [Embedding Guide](https://github.com/chytanka/chytanka.github.io/wiki/Embedding-Chytanka-on-Your-Website).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
