import assert from 'node:assert/strict';
import {test} from 'node:test';
import {getPropertySpaceLabel, getPropertySpaces} from '../src/utils/property-spaces.ts';

test('migrated spaces retain their quantities and override legacy counters', () => {
  const spaces = [{type: 'dormitorio', quantity: 2}, {type: 'patio_fogon', quantity: 1}];
  assert.deepEqual(getPropertySpaces(spaces, {bedrooms: 9}), spaces);
  assert.equal(getPropertySpaceLabel(spaces[0]), 'Dormitorios');
  assert.equal(getPropertySpaceLabel(spaces[1]), 'Patio con fogón');
});

test('legacy properties use only recorded counters, while explicit empty spaces remain empty', () => {
  const specs = {rooms: 4, bedrooms: 2, bathrooms: 1, garageCount: 0};
  assert.deepEqual(getPropertySpaces(null, specs), [
    {type: 'ambiente', quantity: 4}, {type: 'dormitorio', quantity: 2}, {type: 'bano', quantity: 1},
  ]);
  assert.deepEqual(getPropertySpaces(undefined, specs), getPropertySpaces(null, specs));
  assert.deepEqual(getPropertySpaces([], specs), []);
  assert.deepEqual(getPropertySpaces(undefined), []);
});

test('invalid quantities are omitted and duplicate space types are combined', () => {
  assert.deepEqual(getPropertySpaces([
    null, {}, {type: 'bano', quantity: 0}, {type: 'cocina', quantity: -1},
    {type: 'patio', quantity: Infinity}, {type: '', quantity: 3},
    {type: 'dormitorio', quantity: 2}, {type: 'dormitorio', quantity: '1'},
  ]), [{type: 'dormitorio', quantity: 3}]);
});

test('all current backoffice space types have readable singular and plural labels', () => {
  const types = ['ambiente', 'living', 'living_comedor', 'cocina', 'cocina_comedor',
    'dormitorio', 'escritorio', 'vestidor', 'bano', 'bano_suite', 'toilette', 'lavadero',
    'deposito', 'patio', 'patio_fogon', 'jardin', 'jardin_parquizado', 'quincho', 'balcon',
    'terraza', 'hall_entrada', 'cochera', 'entrada_auto', 'acceso_compartido', 'patio_compartido'];
  for (const type of types) {
    for (const quantity of [1, 2]) {
      const label = getPropertySpaceLabel({type, quantity});
      assert.match(label, /^[A-ZÁÉÍÓÚ]/);
      assert.ok(!label.includes('_'));
    }
  }
  assert.equal(getPropertySpaceLabel({type: 'sala_nueva', quantity: 1}), 'sala nueva');
});
