// message object contains id of the audio tag and href of the lemma
// Example:
// message.id:
//  DE/61/6119499813b0de1f2fa894f552c1f2a3-201
// message.href:
//  http://www.linguee.de/deutsch-englisch/uebersetzung/schaffen.html
// Resulting audio file is at the address:
//  http://www.linguee.de/mp3/DE/61/6119499813b0de1f2fa894f552c1f2a3-201.mp3
// And should be saved as:
//  somewhere/schaffen.mp3

function lingueeDownload (message) {
  console.log('background-script: ')
  console.log(message)

  var xs = message.href.split('/')

  if (xs.length !== 6) {
    console.log('xs.length === ' + xs.length + ', expected 6')
    console.log(message.href)
  }

  if (xs.length < 6) {
    console.log('xs.length < 6, will not attempt to download anything')
    return
  }

  var languages = xs[3].split('-')

  if (languages.length !== 2) {
    console.log(
      'languages.length === ' + languages.length + ', expected 2'
    )
  }

  var language = languages[0]

  var lemmas = xs[5].split('.')

  if (lemmas.length !== 2) {
    console.log('lemmas.length === ' + lemmas.length + ', expected 2')
  }

  var lemma = lemmas[0]

  var url = xs[0] + '//' + xs[2] + '/mp3/' + message.id + '.mp3'

  console.log('About to download from:')
  console.log(url)
  console.log('Will save it as ' + lemma + '.mp3')

  var x = message.id.split('/')

  browser.downloads.download({
    url: url,
    filename: language + '/' + lemma + '-' + x[x.length - 1] + '.mp3'
  })
}

browser.runtime.onMessage.addListener(lingueeDownload)
