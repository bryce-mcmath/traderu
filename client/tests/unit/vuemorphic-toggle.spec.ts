import { shallowMount } from '@vue/test-utils';
import VuemorphicToggle from '../../src/components/vuemorphic_toggle/VuemorphicToggle.vue';

describe('FooterNav.vue', () => {
  let mocks;
  beforeEach(() => {
    mocks = {
      $store: {
        state: {
          ui: {
            dark: true
          }
        }
      }
    }
  });

  it('emits toggledark event when clicking dark mode toggle', async () => { 
    const wrapper = shallowMount(VuemorphicToggle, {
      propsData: {
        eventToEmit: 'toggledark'
      },
      mocks
    });
    wrapper.trigger('click');
    await wrapper.vm.$nextTick()
    expect(wrapper.emitted('toggledark'))
  });
});