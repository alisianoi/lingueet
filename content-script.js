console.log('linguee content-script: ')

let selector = 'div.exact div.lemma.featured h2.line.lemma_desc[lid]'

let entries = document.querySelectorAll(selector)

if (entries.length === 0) {
  console.log('did not find any entries, check the selector?')
} else if (entries.length === 1) {
  console.log('found 1 entry')
} else {
  console.log('found ' + entries.length + ' entries')
}

for (let entry of entries) {
  console.log(entry)

  let word = entry.querySelectorAll('a.dictLink')

  if (word.length !== 1) {
    console.error('Expected 1 a.dictLink, found ' + word.length)

    continue
  }

  word = word[0]

  // console.log(word.href)

  let audio = entry.querySelectorAll('a.audio')

  if (audio.length !== 1) {
    console.error('Expected 1 a.audio, found ' + audio.length)

    continue
  }

  audio = audio[0]

  // console.log(audio.id)

  browser.runtime.sendMessage({id: audio.id, href: word.href})
}
