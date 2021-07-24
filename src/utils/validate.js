const RegexConstants = {
    // 验证手机号
    MOBILE: '^((13[0-9])|(14[5,7,9])|(15[^4])|(16[2,5,6,7])|(17[0,1,2,3,5,6,7,8])|(18[0-9])|(19[1,2,5,8,9]))\\d{8}$',
}
export default RegexConstants

/**
 * 移动手机号码的校验
 * @param {string} mobile
 * @returns {Boolean}
 */
export function validMobile (mobile) {
    return new RegExp(RegexConstants.MOBILE).test(mobile)
}

