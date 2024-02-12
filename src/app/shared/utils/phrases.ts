export class Phrases {
    title: string = "Chytanka — read it easily and comfortably!";
    shortTitle: string = "Chytanka";
    enterLink: string = "Enter link to episode on Imgur, Telegra.ph, Reddit, MD";
    slogan: string = "and read it easily and comfortably!";
    letsgo: string = "Let's go"
    dataLoadErr: string = "Data loading error. Please try again later."
    imagesVia: string = "Images via "
    thanks: string = "Thanks!"
    detalisCopy: string = "Details on their site. Поважай авторські права."
    fullscreen: string = "Fullscreen";
    scrollLeft: string = "Scroll left";
    scrollRight: string = "Scroll right";
    scrollDown: string = "Scroll down";
    nightlight: string = "Nightlight";
    nsfwWarnTitle: string = "⚠️🔞 NSFW Content"
    nsfwWarnText: string = "2The following content may be <b>Not Safe For Work</b>. Viewer discretion is advised."
    nsfwLabelAgree: string = "Ready for the wild side!"
    nsfwLabelDisagree: string = "I'll pass, let's keep it safe."
    ukrainian: string = "Українська"
    english: string = "English"
    tryAgain: string = "Try again"

    getByKey(key: string) {
        const keys = Object.keys(this);
        
        if (keys.includes(key)) return this[key as keyof Phrases]

        return null;
    }
}