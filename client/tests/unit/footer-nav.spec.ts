import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import FooterNav from '@/components/footer_nav/FooterNav.vue';
const localVue = createLocalVue()

localVue.use(Vuex);

//Commenting out localVue.use(Vuetify) and commenting in below stops error, but ignores the vuetify component.
//@TODO: figure out why vuetify components not registering correctly
localVue.use(Vuetify);
// Vue.config.ignoredElements = [
//   'v-bottom-navigation'
// ];


describe('FooterNav.vue', () => {
  let store, vuetify;

  beforeEach(() => {
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: {
        ui: {
          dark: true
        }
      }
    })
  });

	it('Sets only the trade button active when at the trade route', () => {
    //computed property tabSelected requires a mocked $route 
    const $route = {
      path: '/trade'
    }

		const wrapper = shallowMount(FooterNav, {
      localVue,
      vuetify,
      store,
      mocks: {
        $route
      }
    });

    //Get buttons
    const tradeButton = wrapper.find('[label="Trade"]');
    const infoButton = wrapper.find('[label="Info"]');
    const leaderboardButton = wrapper.find('[label="Portfolios"]');
    const portfolioButton = wrapper.find('[label="Leaderboard"]');
    
    //Check trade button active, all others inactive
    expect(tradeButton.html()).toContain('active');
		expect(infoButton.html()).not.toContain('active');
		expect(leaderboardButton.html()).not.toContain('active');
		expect(portfolioButton.html()).not.toContain('active');
  });
  
	it('Applies dark mode when dark set true in state', () => { 
    //computed property tabSelected requires a mocked $route 
    const $route = {
      path: '/trade'
    }

    const wrapper = shallowMount(FooterNav, {
      localVue,
      vuetify,
      store,
      mocks: {
        $route
      }
    });

    expect(wrapper.classes()).toContain('v-bottom-navigation--dark')
  });
});
