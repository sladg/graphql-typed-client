'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
var chain_1 = require('./chain')
describe('chain', function() {
  test('convert deep scalar query', function() {
    var onExecute = jest.fn()
    var c = chain_1.chain(onExecute)
    c.path.to.scalar.execute()
    expect(onExecute.mock.calls[0]).toEqual([['path', 'to', 'scalar'], { path: { to: { scalar: 1 } } }, undefined])
  })
  test('convert deep scalar query with default value', function() {
    var onExecute = jest.fn()
    var c = chain_1.chain(onExecute)
    c.path.to.scalar.execute(1, 'defaultValue')
    expect(onExecute.mock.calls[0]).toEqual([['path', 'to', 'scalar'], { path: { to: { scalar: 1 } } }, 'defaultValue'])
  })
  test('convert deep scalar query with args', function() {
    var onExecute = jest.fn()
    var c = chain_1.chain(onExecute)
    c.path
      .to({ id: 'ID' })
      .scalar({ id: 'ID' })
      .execute()
    expect(onExecute.mock.calls[0]).toEqual([
      ['path', 'to', 'scalar'],
      { path: { to: [{ id: 'ID' }, { scalar: [{ id: 'ID' }] }] } },
      undefined,
    ])
  })
  test('convert deep scalar query with args and default value', function() {
    var onExecute = jest.fn()
    var c = chain_1.chain(onExecute)
    c.path
      .to({ id: 'ID' })
      .scalar({ id: 'ID' })
      .execute(1, 'defaultValue')
    expect(onExecute.mock.calls[0]).toEqual([
      ['path', 'to', 'scalar'],
      { path: { to: [{ id: 'ID' }, { scalar: [{ id: 'ID' }] }] } },
      'defaultValue',
    ])
  })
  test('convert deep object query', function() {
    var onExecute = jest.fn()
    var c = chain_1.chain(onExecute)
    c.path.to.object.execute({ some: 1, other: 1 })
    expect(onExecute.mock.calls[0]).toEqual([
      ['path', 'to', 'object'],
      { path: { to: { object: { some: 1, other: 1 } } } },
      undefined,
    ])
  })
  test('convert deep object query with default value', function() {
    var onExecute = jest.fn()
    var c = chain_1.chain(onExecute)
    c.path.to.object.execute({ some: 1, other: 1 }, 'defaultValue')
    expect(onExecute.mock.calls[0]).toEqual([
      ['path', 'to', 'object'],
      { path: { to: { object: { some: 1, other: 1 } } } },
      'defaultValue',
    ])
  })
  test('convert deep object query with args', function() {
    var onExecute = jest.fn()
    var c = chain_1.chain(onExecute)
    c.path
      .to({ id: 'ID' })
      .object({ id: 'ID' })
      .execute({ some: 1, other: 1 })
    expect(onExecute.mock.calls[0]).toEqual([
      ['path', 'to', 'object'],
      { path: { to: [{ id: 'ID' }, { object: [{ id: 'ID' }, { some: 1, other: 1 }] }] } },
      undefined,
    ])
  })
  test('convert deep object query with args and default value', function() {
    var onExecute = jest.fn()
    var c = chain_1.chain(onExecute)
    c.path
      .to({ id: 'ID' })
      .object({ id: 'ID' })
      .execute({ some: 1, other: 1 }, 'defaultValue')
    expect(onExecute.mock.calls[0]).toEqual([
      ['path', 'to', 'object'],
      { path: { to: [{ id: 'ID' }, { object: [{ id: 'ID' }, { some: 1, other: 1 }] }] } },
      'defaultValue',
    ])
  })
  test('throw on invalid chain prop access', function() {
    var c = chain_1.chain(function() {})
    expect(function() {
      return c.path.to[Symbol()]
    }).toThrow('property is not a string')
  })
})
//# sourceMappingURL=chain.test.js.map
