export class Phrases {
    title: string = "Chytanka — read it easily and comfortably!";
    shortTitle: string = "Chytanka";
    enterLink: string = "Insert link to episode on the supported sites";
    orOpenFile = "or open file"
    slogan: string = "and read it easily and comfortably!";
    sloganPride: string = "Read freely! Love boldly!";
    sloganHalloween: string = "Read if you dare...";
    sloganNewYear: string = "Read cozy. Dream big.";
    sloganValentine: string = "Swipe pages, not just profiles.";
    letsgo: string = "Let's go"
    dataLoadErr: string = "Data loading error. Please try again later."
    imagesVia: string = "Images via "
    thanks: string = "Thanks!"
    detalisCopy: string = "Details on their site. Respect copyright."
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
    description: string = "Chytanka is a PWA designed for comfortable manga and comic reading. The minimalist design and the night mode feature make reading easy and comfortable."
    ok: string = "OK"
    help = "Help"
    faq = "F.A.Q"
    whatIsChytanka = "What is Chytanka?"
    howToUseChytanka = "How to use Chytanka?"
    whatLinks = "What links does Chytanka support?"
    canIPasteJsonLink = "Can I paste a link to a JSON file?"
    whatJsonModel = "What should the JSON file model be?"
    yesYouCanPasteJsonLink = "Yes, you can, for example, to {value} or to your website."
    howToUseChytankaAnswer = "🔗 Just paste the link to the episode into the input field.<br>🔳 If the link is supported, a button will appear,<br>🖱️ click it,<br>📖 and read easily and comfortably! 🛋️"
    whereIdIs = ", where {id} is the unique identifier of the post."
    language = "Language"
    settingLangDesc = "Change the user interface language."
    settings = "Settings"
    autoPasteLink = "Auto Paste Link"
    settingAutoPasteLinkDesc = "Automatically inserts a link from the clipboard into the input field."

    history = "History"
    clearHistory = "Clear history";
    share = 'Share'
    untitled = 'Untitled'
    loading = 'loading'
    createList = "Create list"
    openFile = "Open file"
    dropIt = "Drop it!"
    pageNotFound = [
        "Oh no! The page you’re looking for got lost between manga panels...",
        "It seems this page vanished like a manga artist on a deadline.",
        "This page went off to binge manga and forgot to return.",
        "Looks like this page turned into the mysterious Volume 404.",
    ]
    seasonalTheme = `SeasonalTheme`;
    seasonalThemeDesc = `🏳️‍🌈 Pride month, 🎃 Halloween, 🎄 New Year, 💖 Valentine etc.`;
    historyEmpty = "Hmm… looks like you haven’t read anything yet 👀";
    histyryEmptyDesc = "It’s the perfect time to open your first chapter! 📖";
    vol = "Vol"
    ch = "Ch"
    sitesHistory = "Sites history"
    filesHistory = "Files history"
    getByKey = (key: string) => (Object.keys(this).includes(key)) ? this[key as keyof Phrases] : null;

    static getTemplate(phrase: string, value: string) {
        return phrase.replace("{value}", value)
    }
}