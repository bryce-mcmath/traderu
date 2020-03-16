Note: these are preliminary component names.

<App>
  <Login 1> *Route handled by vue router
    <Auth local-store="phoneNum:int, pass:string"> --> Store pass/info in local state, never in vuex store.

  <Link Account>  *Route handled by vue router
    <Generic Container v-for="bank in banks"> --> will reuse for cards
      <Linkto props="bankName:string, bankImgUrl:string"> --> Iterated from parent container, receives props

  <Link Card 1 and Link card 2> *Route handled by vue router
    <Card and name form input vuex-store="cardNumber:int, cardHolderName:string, identityString:string" vuex-action="editCardNumber(), editCardHolderName(), editIdentityString(), submitLinkCard()"> --> (remember to wipe store after use)
    <Success / Failure Notification vuex-store="showNotification:boolean" vuex-action="acknowledgeModal()">

  <Link Card 3 and Link Card 4> *Route handled by vue router
    //Top half
    <One time pad code display vuex-store="otp:int, showOtpInputDisplay:boolean">
    //Bottom half
    <div>
      <Bottom half phone call confirm>
      <Linked Info Display vuex-store="showOtpInfo:boolean">
      <In app OTP entry vuex-store="otp:int, showOtpInput:boolean" vuex-action="editOtpNum(), submitOtpNum()">
    </div> 
    //Modal or full screen cover
    <Success / Failure Notification vuex-store="showNotification:boolean" vuex-action="acknowledgeModal()">

<Recharge money and recharge money 2> \*Route handled by vue router

<div>
//Top half
<Charge to account info display vuex-store="wallets:[string], selectedWallet:{name/balance}" vuex-action="selectWallet()">
//Bottom half
<Amount selector vuex-store="rechargeAmount:int" vuex-action="sumbitRechargeAmount()">
</div>
<Success / Failure Notification vuex-store="showNotification:boolean" vuex-action="acknowledgeModal()">
<Vertify vuex-store="vertifyCode:string" vuex-action="editVertifyCode(), submitVertfiyCode()">

//Not actually valid store, just a psuedo code object
const vuexStore = new Vuex.Store({
state: {
banks: [{}],
cards: [{}],
currentRoute: string,
showNotification: boolean,
cardNumber: int,
cardHolderName: string,
identityString: string,
otp: int,
showOtpInputDisplay: boolean,
showOtpInfo: boolean,
showOtpInput boolean,
wallets: [string]
selectedWallet:{
walletName: string,
walletBalance: int
},
rechargeAmount:int.
vertifyCode:string
},
mutations: {
acknowledgeModal,
editCardNumber,
editCardHolderName,
editIdentityString
submitLinkCard,
editOtpNum,
submitOtpNum,
selectWallet,
sumbitRechargeAmount,
editVertifyCode,
submitVertfiyCode
}
//Note, may need to move wallets to own modules
//Currently assuming all mutations are synchronous, but may be updated to asynch store actions
//submit functions may need to wipe inputed store values for security reasons
})
