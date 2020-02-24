import { mount } from '@vue/test-utils'
import CoordinateSelector from '@/components/Map/CoordinateSelector'

describe('CoordinateSelector.vue', () => {
  test('getCoordinates Called Correctly', () => {
    const wrapper = mount(CoordinateSelector)
    const getCoordinates = jest.fn()
    wrapper.setMethods({ getCoordinates })
    wrapper.find('button').trigger('click')
    expect(getCoordinates).toHaveBeenCalled()
  })

  test('Same source and destination test', () => {
    const wrapper = mount(CoordinateSelector)
    window.alert = jest.fn()
    wrapper.find('input#lat1').setValue(1)
    wrapper.find('input#lon1').setValue(1)
    wrapper.find('input#lat2').setValue(1)
    wrapper.find('input#lon2').setValue(1)
    wrapper.vm.getCoordinates()
    expect(window.alert).toHaveBeenCalledWith('Same source and destination')
  })

  test('Incorrect Input/Inputs test', () => {
    const wrapper = mount(CoordinateSelector)
    window.alert = jest.fn()
    wrapper.find('input#lat1').setValue('test')
    wrapper.find('input#lon1').setValue(1)
    wrapper.find('input#lat2').setValue(1)
    wrapper.find('input#lon2').setValue(1)
    wrapper.vm.getCoordinates()
    expect(window.alert).toHaveBeenCalledWith('Incorrect Input/Inputs')
  })

  test('Input/Inputs out of bounds test', () => {
    const wrapper = mount(CoordinateSelector)
    window.alert = jest.fn()
    wrapper.find('input#lat1').setValue(34)
    wrapper.find('input#lon1').setValue(200)
    wrapper.find('input#lat2').setValue(1)
    wrapper.find('input#lon2').setValue(1)
    wrapper.vm.getCoordinates()
    expect(window.alert).toHaveBeenCalledWith('Input/Inputs out of bounds')
  })

  test('Coordinates load check test', () => {
    const wrapper = mount(CoordinateSelector)
    wrapper.find('input#lat1').setValue(34)
    wrapper.find('input#lon1').setValue(45)
    wrapper.find('input#lat2').setValue(23)
    wrapper.find('input#lon2').setValue(78)
    wrapper.vm.getCoordinates()
    expect(wrapper.vm.coordinates).toEqual([[45,34],[78,23]]);
  })

  test('Coordinates load check test', () => {
    const wrapper = mount(CoordinateSelector)
    wrapper.setProps({distance : 314.40})
    expect(wrapper.props().distance).toBe(314.40)
    // expect(wrapper.find('#distanceholder').text()).toEqual("Distance : 314.40kms");
  })
})
