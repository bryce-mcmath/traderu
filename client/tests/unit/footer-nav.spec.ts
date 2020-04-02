import { shallowMount } from '@vue/test-utils';
import Vue from 'vue';
import FooterNav from '@/components/footer_nav/FooterNav.vue';

//vuetify components throw 'unrecognized component' warnings since they think they are unimported custom components
// This clears warnings
Vue.config.ignoredElements = [
  'v-bottom-navigation'
];


describe('FooterNav.vue', () => {
  let store, mocks;
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

	it('Sets only the assets button active when at the assets route', () => {
    const $route = {
      path: '/assets'
    }
		const wrapper = shallowMount(FooterNav, {
      mocks: {...mocks, $route}
    });

    //Get buttons
    const assetsButton = wrapper.find('[label="Assets"]');
    const infoButton = wrapper.find('[label="Info"]');
    const leaderboardButton = wrapper.find('[label="Leaderboard"]');
    const portfolioButton = wrapper.find('[label="Portfolios"]');
    
    //Check trade button active, all others inactive
    expect(assetsButton.html()).toContain('active');
		expect(infoButton.html()).not.toContain('active');
		expect(leaderboardButton.html()).not.toContain('active');
		expect(portfolioButton.html()).not.toContain('active');
  });

	it('Sets only the info button active when at the info route', () => {
    const $route = {
      path: '/'
    }
		const wrapper = shallowMount(FooterNav, {
      mocks: {...mocks, $route}
    });

    //Get buttons
    const assetsButton = wrapper.find('[label="Assets"]');
    const infoButton = wrapper.find('[label="Info"]');
    const leaderboardButton = wrapper.find('[label="Leaderboard"]');
    const portfolioButton = wrapper.find('[label="Portfolios"]');
    
    //Check trade button active, all others inactive
    expect(assetsButton.html()).not.toContain('active');
		expect(infoButton.html()).toContain('active');
		expect(leaderboardButton.html()).not.toContain('active');
		expect(portfolioButton.html()).not.toContain('active');
  });

	it('Sets only the portfolios button active when at the portfolios route', () => {
    const $route = {
      path: '/portfolios'
    }
    const wrapper = shallowMount(FooterNav, {
      mocks: {...mocks, $route}
    });

    //Get buttons
    const assetsButton = wrapper.find('[label="Assets"]');
    const infoButton = wrapper.find('[label="Info"]');
    const leaderboardButton = wrapper.find('[label="Leaderboard"]');
    const portfolioButton = wrapper.find('[label="Portfolios"]');
    
    //Check trade button active, all others inactive
    expect(assetsButton.html()).not.toContain('active');
		expect(infoButton.html()).not.toContain('active');
		expect(leaderboardButton.html()).not.toContain('active');
		expect(portfolioButton.html()).toContain('active');
  });

	it('Sets only the leaderboard button active when at the leaderboard route', () => {
    const $route = {
      path: '/leaderboard'
    }
    const wrapper = shallowMount(FooterNav, {
      mocks: {...mocks, $route}
    });

    //Get buttons
    const assetsButton = wrapper.find('[label="Assets"]');
    const infoButton = wrapper.find('[label="Info"]');
    const leaderboardButton = wrapper.find('[label="Leaderboard"]');
    const portfolioButton = wrapper.find('[label="Portfolios"]');
    
    //Check trade button active, all others inactive
    expect(assetsButton.html()).not.toContain('active');
		expect(infoButton.html()).not.toContain('active');
		expect(leaderboardButton.html()).toContain('active');
		expect(portfolioButton.html()).not.toContain('active');
  });
  
	it('Applies dark mode when dark set true in state', () => {
    const $route = {
      path: '/leaderboard'
    } 
    const wrapper = shallowMount(FooterNav, {
      store,
      mocks: {...mocks, $route}
    });
    expect(wrapper.classes()).toContain('v-bottom-navigation--dark')
  });
});
