import { shallowMount } from '@vue/test-utils'
import List from '@/components/List.vue'

describe('List', () => {
  const wrapper = shallowMount(List);

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })

  it('has data', () => {
    expect(typeof List.data).toBe('function')
  })

  it('disables request button when dates are more than 7 days apart', async () => {
    wrapper.vm.startDate = "01-01-2000"
    wrapper.vm.endDate = "01-01-2012"
    wrapper.vm.checkDates()
    expect(wrapper.vm.isDisabled).toBe(true)
  })

  it('disables request button when there is no start or end date', async () => {
    wrapper.vm.startDate = null
    wrapper.vm.endDate = null
    wrapper.vm.checkDates()
    expect(wrapper.vm.isDisabled).toBe(true)
  })

  it('allows user to make a request when valid dates are entered', async () => {
    wrapper.vm.startDate = "01-01-2000"
    wrapper.vm.endDate = "01-02-2000"
    wrapper.vm.checkDates()
    expect(wrapper.vm.isDisabled).toBe(false)
  })

  it('does not make an API call when user selects an asteroid that is already selected', async () => {
    wrapper.vm.selectedAsteroid = {id:1}
    wrapper.vm.clicked(1)
    expect(wrapper.vm.selectedAsteroid).toBe(null)
  })

  //this is as far as i had time to get with testing - next steps were to make mock API requests and get to
  //testing the Dialog component

})
