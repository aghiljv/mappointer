import { mount } from '@vue/test-utils'
import Header from '@/components/Header'

describe('Header.vue', ()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper = mount(Header)
    })

    test('Header Text test',()=>{
        expect(wrapper.text()).toEqual('Finder')
    })
})