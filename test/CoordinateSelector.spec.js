import { mount } from '@vue/test-utils'
import CoordinateSelector from '@/components/Map/CoordinateSelector'

describe('CoordinateSelector.vue', () => {
  let wrapper

  beforeEach(() => {
    wrapper = mount(CoordinateSelector)
    window.alert = jest.fn()
  })

  test('getCoordinates Called Correctly', () => {
    const getCoordinates = jest.fn()
    wrapper.setMethods({ getCoordinates })
    wrapper.find('button').trigger('click')
    expect(getCoordinates).toHaveBeenCalled()
  })

  test('Same source and destination test', () => {
    wrapper.find('input#lat1').setValue(1)
    wrapper.find('input#lon1').setValue(1)
    wrapper.find('input#lat2').setValue(1)
    wrapper.find('input#lon2').setValue(1)
    wrapper.vm.getCoordinates()
    expect(window.alert).toHaveBeenCalledWith('Same source and destination')
  })

  test('Incorrect Input/Inputs test', () => {
    wrapper.find('input#lat1').setValue('test')
    wrapper.find('input#lon1').setValue(1)
    wrapper.find('input#lat2').setValue(1)
    wrapper.find('input#lon2').setValue(1)
    wrapper.vm.getCoordinates()
    expect(window.alert).toHaveBeenCalledWith('Incorrect Input/Inputs')
  })

  test('Input/Inputs out of bounds test', () => {
    wrapper.find('input#lat1').setValue(34)
    wrapper.find('input#lon1').setValue(200)
    wrapper.find('input#lat2').setValue(1)
    wrapper.find('input#lon2').setValue(1)
    wrapper.vm.getCoordinates()
    expect(window.alert).toHaveBeenCalledWith('Input/Inputs out of bounds')
  })

  test('Coordinates load check test', () => {
    wrapper.find('input#lat1').setValue(34)
    wrapper.find('input#lon1').setValue(45)
    wrapper.find('input#lat2').setValue(23)
    wrapper.find('input#lon2').setValue(78)
    wrapper.vm.getCoordinates()
    expect(wrapper.vm.coordinates).toEqual([
      [45, 34],
      [78, 23]
    ])
  })

  test('Emit test', () => {
    wrapper.vm.$emit('newCoords', [
      [45, 34],
      [78, 23]
    ])
    expect(wrapper.emitted().newCoords).toBeTruthy()
  })
})
