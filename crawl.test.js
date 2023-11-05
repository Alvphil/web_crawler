const { test, expect } = require('@jest/globals')
const { normalizeURL } = require('./crawl.js')

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