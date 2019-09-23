var Util = {
    // Helpers
    // -------

    // Helper function to correctly set up the prototype chain, for subclasses.
    // Similar to `goog.inherits`, but uses a hash of prototype properties and
    // class properties to be extended.
    extend: function(protoProps, staticProps) {
        var parent = this;
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && _.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function(){ return parent.apply(this, arguments); };
        }

        // Add static properties to the constructor function, if supplied.
        _.extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        var Surrogate = function(){ this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _.extend(child.prototype, protoProps);

        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;

        return child;
    }
};

var Model = function (data) {
    this.__mid = _.uniqueId('_m');

    this.data = data || {};

    if (this.defaults) {
        _.defaults(this.data, this.defaults);
    }
}

Model.prototype.getData = function () {
    return this.data;
}

Model.prototype.setData = function (data) {
    $.extend(true, this.data, data);
}

Model.prototype.set = function (key, val) {
    this.data[key] = val;
}

Model.prototype.get = function (key) {
    return this.data[key];
}

// @Override
Model.prototype.valid = function () {
    return true;
}

/**
 * ItemController
 * @constructor
 * @param opts
 * $container: item container
 * tpl: itemTpl
 * item: Model instance
 */
var ItemController = function (opts) {
    if (!opts) {
        return;
    }

    _.extend(this, opts);

    this.$ = this.$container || $('<div/>');

    this.bindEvt();
}

ItemController.prototype = {
    constructor: ItemController,

    // @Override
    render: function () {
        var data = this.item.getData();
        this.$.html(this.tpl(data));

        this.$.attr('data-index', this.item.__mid);

        this.onItemRendered && this.onItemRendered.call(this, this.item, this.$);

        return this.$;
    },

    // @Override
    show: function () {
        this.$container.html(this.render());
        this.picture = this.setPicture();
    },
    setPicture: function(el){
        var picture = new Picture({
            el: el
        });
        return picture;
    },
    getPicture: function(){
        return this.picture;
    },

    // @Override
    valid: function () {},

    // @Override
    bindEvt: function () {
        var self = this;

        if (this.eventFields) {
            this.eventFields.forEach(function (field) {
                self.$.on('change', '[data-id="' + field + '"]', function () {
                    var val = $(this).val();

                    self.item.set(field, val);
                });
            });
        }
    },

    // @Override
    setData: function () {}
}

var Collection = function (data) {
    this.data = data || [];
};

Collection.prototype.getData = function () {
    return this.data;
}

Collection.prototype.json = function () {
    return this.data.map(function (model) {
        return model.getData.call(model);
    });
}

Collection.prototype.setData = function (data) {
    this.data = data;
}

Collection.prototype.add = function (item) {
    this.data.push(item);
}

Collection.prototype.del = function (item) {
    var index = this.data.indexOf(item);

    if (index != -1) {
        return this.data.splice(index, 1);
    }
}

Collection.prototype.findById = function (id) {
    return _.findWhere(this.data, {
        __mid: id
    });
}

var CollectionController = function (opts) {
    if (!opts) {
        return;
    }

    this.idAttribute = '__mid';

    _.extend(this, opts);

    this.bindEvt();
}

CollectionController.prototype = {
    constructor: CollectionController,

    renderItem: function (item) {
        var itemCtrl = new this.itemController({
            tpl: this.itemTpl,
            item: item
        });

        return itemCtrl.render.call(itemCtrl);
    },

    renderList: function (list) {
        var $items = [],
            self = this;

        list.forEach(function (item) {
            $items.push(self.renderItem(item));
        });

        return $items;
    },

    show: function () {
        var list = this.list.getData();

        this.$container.append(this.renderList(list));
    },

    add: function (item) {
        this.list.add(item);

        this.$container.append(this.renderItem(item));
    },

    del: function (item) {
        this.list.del(item);

        $('[data-index="' + item[this.idAttribute] +'"]', this.$container).remove();
    },

    // @override
    save: function () {
        console.log(this.list.json());
//                    $.ajax({
//                        url: '',
//                        data: this.list.getData(),
//                        dateType:'json',
//                        type:'post',
//                        success:function(){},
//                        error:function(){}
//                    })
    },

    bindEvt: function () {
        var self = this;

        $('[data-id="add-btn"]', this.$container.parent()).on('click', function () {
            self.add.call(self, new self.item());
        });
        $('[data-id="del-btn"]', this.$container.parent()).on('click', function () {
            var item = _.last(self.list.getData());

            if (item) {
                self.del.call(self, item);
            }
        });
        $('[data-id="save-btn"]', this.$container.parent()).on('click', _.bind(this.save, this));
    }
}

Model.extend = ItemController.extend = Collection.extend = CollectionController.extend = Util.extend;