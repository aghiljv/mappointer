import { mount } from '@vue/test-utils'
import MapHolder from '@/components/Map/MapHolder'

jest.mock('mapbox-gl/dist/mapbox-gl', () => ({
  GeolocateControl: jest.fn(),
  Map: jest.fn(() => ({
    addControl: jest.fn(),
    on: jest.fn(),
    remove: jest.fn()
  })),
  NavigationControl: jest.fn()
}))

describe('MapHolder.vue', () => {
  let wrapper

  beforeEach(() => {
    
    wrapper = mount(MapHolder, {
      propsData: {coordinates : [[1,2],[3,4]]}
    })
  })

  test('Emit test', () => {
    wrapper.vm.$emit('newDistance', 314.4)
    expect(wrapper.emitted().newDistance).toBeTruthy()
  })

  // test('calcAndJump call test', () => {
    
  //   const calcAndJump = jest.fn()
  //   wrapper.setMethods({ calcAndJump })
  //   wrapper.vm.updateSources()
  //   expect(calcAndJump).toHaveBeenCalled()
  // })

  // test('addMultiplePoints test', () => {
  //   const addMultiplePoints = jest.fn()
  //   wrapper.setMethods({ addMultiplePoints })
  //   wrapper.setProps({coordinates : [[2,2],[3,4]]})
  //   wrapper.vm.calcAndJump();
  //   expect(wrapper.emitted().newDistance).toBeTruthy()
  // })
})
