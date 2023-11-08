const { test, expect } = require('@jest/globals')
const { normalizeURL, getURLsFromHTML } = require('./crawl.js')

test('https://boot.dev/path to boot.dev', () => {
    expect(normalizeURL('https://boot.dev/path')).toBe('boot.dev/path')
});

test('http://boot.dev/path/ to boot.dev', () => {
    expect(normalizeURL('http://boot.dev/path/')).toBe('boot.dev/path')
});

test('http://boot.dev/path to boot.dev', () => {
    expect(normalizeURL('https://boot.dev/path')).toBe('boot.dev/path')
});

test('http://boot.dev/path/ to boot.dev', () => {
    expect(normalizeURL('https://boot.dev/path/')).toBe('boot.dev/path')
});

test('https://boot.dev/path?name=banana to boot.dev', () => {
    expect(normalizeURL('https://boot.dev/path?name=banana')).toBe('boot.dev/path')
});

test('https://boot.dev:8000/path?name=banana to boot.dev', () => {
    expect(normalizeURL('https://boot.dev:8000/path?name=banana')).toBe('boot.dev/path')
});

test('https://abc:123@boot.dev/path?name=banana to boot.dev', () => {
    expect(normalizeURL('https://abc:123@boot.dev/path?name=banana')).toBe('boot.dev/path')
});

test('getURLsFromHTML absolute', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="https://blog.boot.dev"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML relative', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML both', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="/path/one"><span>Boot.dev></span></a><a href="https://other.com/path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ 'https://blog.boot.dev/path/one', 'https://other.com/path/one' ]
    expect(actual).toEqual(expected)
  })
  
  test('getURLsFromHTML handle error', () => {
    const inputURL = 'https://blog.boot.dev'
    const inputBody = '<html><body><a href="path/one"><span>Boot.dev></span></a></body></html>'
    const actual = getURLsFromHTML(inputBody, inputURL)
    const expected = [ ]
    expect(actual).toEqual(expected)
  })


  test('normalizeURL protocol', () => {
    const input = 'https://blog.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL slash', () => {
    const input = 'https://blog.boot.dev/path/'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL capitals', () => {
    const input = 'https://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })
  
  test('normalizeURL http', () => {
    const input = 'http://BLOG.boot.dev/path'
    const actual = normalizeURL(input)
    const expected = 'blog.boot.dev/path'
    expect(actual).toEqual(expected)
  })