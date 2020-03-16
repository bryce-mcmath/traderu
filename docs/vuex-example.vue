<template>
  <div>
    <div>
      <div>Times submitted: {{submitCounter}}</div>
      <div>Username: {{username}}</div>
      <div>Password: {{password}}</div>
      <div>Something: {{something}}</div>
    </div>

    <div>
      <!-- value is what the input field holds in regular html, :value means it is bound to the variable by vue -->
      <input id="user-name" type="text" :value="username" @input="updateUsername" />
      <input id="pass-word" type="password" :value="password" @input="updatePassword" />
      <input id="some-string" type="text" :value="something" @input="updateSomething" />
    </div>

    <button id="tell-vuex-store-to-submit" @click="submitInfo" />
  </div>
</template>

<script>
export default {
  computed: {
    // below function name is what things in template with curly brackets refer to
    submitCounter() {
      return this.$store.state.counterInStore;
    },
    username() {
      return this.$store.state.usernameInStore;
    },
    password() {
      return this.$store.state.passwordInStore;
    },
    something() {
      return this.$store.state.somethingInStore;
    }
  },
  methods: {
    // String parameter is the name of method in vuex store
    updateUsername(e) {
      this.$store.commit("updateUsernameInStore", e.target.value);
    },
    updatePassword(e) {
      this.$store.commit("updatePasswordInStore", e.target.value);
    },
    updateUsername(e) {
      this.$store.commit("updateSomethingInStore", e.target.value);
    },
    submitInfo() {
      this.$store.commit("submitFormInStore"); //The store should have all the data and will make the ajax call there.
    }
  }
};

//Technically, the below is in the vuex store in another file
const Axios = { post: () => "" }; //Pretend this line is "import Axios from 'axios'"

const vuexStore = new Store({
  state: {
    submitCounter: 0,
    username: "",
    password: "",
    something: ""
  },
  mutations: {
    // Similar to react hooks, replacing state with spread operator might cause problems, just modify the state object directly.
    updateUsernameInStore(state, eTargetValueFromComponent) {
      state.username = eTargetValueFromComponent;
    },
    updatePasswordInStore(state, eTargetValueFromComponent) {
      state.password = eTargetValueFromComponent;
    },
    updateSomethingInStore(state, eTargetValueFromComponent) {
      state.something = eTargetValueFromComponent;
    },
    submitFormInStore(state) {
      state.submitCounter++;

      Axios.post("/urlRoute", {
        sendUsernameToServer: state.username,
        sendPasswordToServer: state.password,
        sendSomethingToServer: state.something
      })
        .then()
        .catch()
        .finally();
    }
  }
});
</script>

