/**
 * Created by Jose Mansilla on 17/01/15.
 */
define(function(require){

    var Notification = function(type, msg, lock){
        this.type = type;
        this.msg = msg;
        this.lock = lock;
    };

    var notifications = {
        notificationsArr: ko.observableArray(),

        show: function(type, msg, lock){
            var notification = new Notification(type, msg, lock);
            this.notificationsArr.push(notification);
            if(!lock){
                setTimeout(function(){
                    notifications.notificationsArr.remove(notification);
                }, 5000);
            }
        },

        afterAdd: function(element){
           if (element.nodeType === 1) $(element).hide().slideDown();
        },

        beforeRemove: function(element){
            if (element.nodeType === 1) $(element).slideUp(function(){
                $(element).remove();
            });
        },
        
        deleteNotifications: function(){
          this.notificationsArr([]);  
        }
    };

    return notifications;
});