module.exports = function() {
  window['__onGCastApiAvailable'] = function(isAvailable) {
    if (isAvailable) {
      window.GOOGLE_CAST = isAvailable
      window.cast.framework.CastContext.getInstance().setOptions({
        receiverApplicationId: window.chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID
      })
    }
  }
}
