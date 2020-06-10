

// 解决小数精度问题 加法
export const numAdd  = (num1, num2) => {
    let baseNum, baseNum1, baseNum2;
    num1 = parseFloat(num1).toFixed(2)
    num2 = parseFloat(num2).toFixed(2)
    try {
      baseNum1 = num1.toString().split('.')[1].length;
  } catch (e) {
      baseNum1 = 0;
  }
    try {
      baseNum2 = num2.toString().split('.')[1].length;
  } catch (e) {
      baseNum2 = 0;
  }
    baseNum = Math.pow(10, Math.max(baseNum1, baseNum2));
    return (num1 * baseNum + num2 * baseNum) / baseNum;
}

// 解决小数精度问题 乘法
export const numMulti = (num1, num2)  => {
    var baseNum = 0;
    num1 = parseFloat(num1).toFixed(2)
    num2 = parseFloat(num2).toFixed(2)
    try {
      baseNum += num1.toString().split('.')[1].length;
  } catch (e) {
  }
    try {
      baseNum += num2.toString().split('.')[1].length;
  } catch (e) {
  }
    return Number(num1.toString().replace('.', '')) * Number(num2.toString().replace('.', '')) / Math.pow(10, baseNum);
}
