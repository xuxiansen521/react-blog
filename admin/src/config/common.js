export const scrollBottom = (dom) => {
    const scrollHeight = dom.scrollHeight;//里面div的实际高度  2000px
    const height = dom.clientHeight;  //网页可见高度  200px
    const maxScrollTop = scrollHeight - height;
    dom.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
}