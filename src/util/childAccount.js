export default {
  getAccountType(str){
    let result='';
      if(str==='1') {
        result='子账户'
      }else if(str==='0') {
        result = '主账号';
      }
      return result;
  },
  getActive(str) {
    let res='';
    if(str===true){
      res='√'
    }else if(str===false){
      res='×'
    }
    return res
  }
}
