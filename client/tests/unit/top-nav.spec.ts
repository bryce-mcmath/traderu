import { shallowMount } from '@vue/test-utils';
import Navbar from '@/components/navbar/Navbar.vue';
import Vue from 'vue';

Vue.config.ignoredElements = [
  'v-app-bar-nav-icon'
];

describe('FooterNav.vue', () => {
  let mocks;
  beforeEach(() => {
    mocks = {
      $route: {
        path: '/assets'
      },
      $store: {
        state: {
          ui: {
            dark: true
          }
        }
      }
    }
  });
  //NOTE: for mutations, can use a mock to test mutation is fired on correct event.
  //mutation function can be tested separately. For testing local methods,
  // test the method directly without mocking.
	it('calls toggleDrawer mutation when clicking menu button', async () => {   
    const toggleDrawer = jest.fn();
		const wrapper = shallowMount(Navbar, {
      methods: {
        toggleDrawer
      },
      mocks
    });
    //get menu btn
    const btn = wrapper.find('[data-cy="toggle-nav-drawer"]')
    btn.trigger('click');
    await wrapper.vm.$nextTick()
    expect(toggleDrawer).toHaveBeenCalled()    
  });

  it('Applies dark mode when dark set true in state', () => { 
    const wrapper = shallowMount(Navbar, {
      mocks
    });
    expect(wrapper.classes()).toContain('navbar--dark')
  });
  

});