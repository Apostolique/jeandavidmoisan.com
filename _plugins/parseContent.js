const { parseDocument } = require('htmlparser2')
const domutils = require('domutils')
const render = require("dom-serializer").default

// TODO: This can be made more efficient by doing everything together and returning everything together.

function getFirstH1(content) {
    let root = parseDocument(content)
    let h1 = domutils.findOne(e => e.tagName === 'h1', root.children)

    let pageTitle = h1 ? domutils.textContent(h1) : "Untitled"

    return pageTitle
}

function getFirstP(content) {
    let root = parseDocument(content)
    let p = domutils.findOne(e => e.tagName === 'p', root.children)

    let pageDescription = p ? domutils.textContent(p) : undefined

    return pageDescription
}

function getTitle(content, site) {
    let root = parseDocument(content)
    let h1 = domutils.findOne(e => e.tagName === 'h1', root.children)

    let pageTitle = site.title

    if (h1) {
      let currentTitle = domutils.textContent(h1)
      // Useful on the home page. Don't want "title - title"
      if (currentTitle !== site.title) {
        pageTitle = `${currentTitle} - ${site.title}`
      }
    }

    return pageTitle
}

function getDescription(content, site) {
    let root = parseDocument(content)
    let p = domutils.findOne(e => e.tagName === 'p', root.children)

    let pageDescription = site.description

    if (p) {
      pageDescription = domutils.textContent(p)
    }

    return pageDescription
}

function getToc(content) {
    let root = parseDocument(content)
    let tags = ['h2', 'h3', 'h4']
    let h = domutils.findAll(e => tags.some(t => e.tagName == t), root.children)

    let prev = [{
      tagName: 'h1',
      href: '',
      title: '',
      children: []
    }]

    for (let e of h) {
      while (e.tagName <= prev[prev.length - 1].tagName) {
        prev.pop()
      }

      let newChild = {
        tagName: e.tagName,
        href: `#${e.attribs.id}`,
        title: domutils.textContent(e.childNodes[0]),
        children: []
      }

      prev[prev.length - 1].children.push(newChild)
      prev.push(newChild)
    }

    return prev[0].children
}

function getMain(content) {
    let root = parseDocument(content)

    let h1 = domutils.findOne(e => e.tagName === 'h1', root.children)
    if (h1) {
        domutils.removeElement(h1)
    }

    let p = domutils.findOne(e => e.tagName === 'p', root.children)
    if (p) {
        domutils.removeElement(p)
    }

    return render(root)
}

module.exports = { getFirstH1, getFirstP, getTitle, getDescription, getToc, getMain }
