import { shallowMount, createLocalVue } from '@vue/test-utils';
import Vuex from 'vuex';
import Vuetify from 'vuetify';
import LoginDialog from '@/components/login_dialog/LoginDialog.vue';
const localVue = createLocalVue()

localVue.use(Vuex);

//Commenting out localVue.use(Vuetify) and commenting in below stops error, but ignores the vuetify component.
//@TODO: figure out why vuetify components not registering correctly
localVue.use(Vuetify);
// Vue.config.ignoredElements = [
//   'v-bottom-navigation'
// ];

describe('LoginDialog.vue', () => {
  let store, vuetify, mutations;

  beforeEach(() => {
    mutations = {
      setLoginEmail: jest.fn(),
      setLoginPassword: jest.fn()
    }
    vuetify = new Vuetify();
    store = new Vuex.Store({
      state: {
        ui: {
          dark: true,
        }
      },
      mutations
    })
  });

	it('Updates password and email in store when entered in inputs', async () => {
		const wrapper = shallowMount(LoginDialog, {
      localVue,
      vuetify,
      store,
    });

    //Get buttons
    const emailInput = wrapper.find('input[type="email"]');
    const passwordInput = wrapper.find('input[type="password"]');

    emailInput.setValue('tu@gmail.com');
    emailInput.trigger('input');
    expect(mutations.setLoginEmail).toHaveBeenCalled();
    
    passwordInput.setValue('password');
    passwordInput.trigger('input');
    expect(mutations.setLoginPassword).toHaveBeenCalled();
  });
});
