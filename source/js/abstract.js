// src/core.js
var Abstract = {};
Abstract.Modules = {};

Abstract.build = function(selector, width, height, draw) {
  var canvases = [];
  if (selector) {
    $(selector).each(function() {
      canvas = new Abstract.Canvas({
        width : width,
        height : height,
        draw : draw,
        element : this
      });
      canvases.push(canvas);
      $(this).data('AbstractCanvas', canvas);
    });
  }
  return canvases;
}

// src/utilities.js
Abstract.utilites = {
  options : function(options, defaults) {
    return $.extend({}, defaults, options);
  },
  parseMeasurement : function(measurement, dimension) {
    var parse = function(m) {
      if (dimension && typeof m == 'string' && m.indexOf('%') != -1) {
        m = dimension * (parseInt(m)/100);
      }
      return m;
    }
    if (measurement instanceof Array) {
      $.each(measurement, function(i, j) {
        measurement[i] = parse(j);
      });
      return measurement;
    } else {
      return parse(measurement);
    }
  },

  random : function(v, exclude) {
    if (v && typeof v.generate == 'function') return v.generate();

    if (v instanceof Array) {

      if (exclude) {
        if (!(exclude instanceof Array)) exclude = [exclude];
        vv = [];
        $.each(v, function(i, e) {
          if ($.inArray(e, exclude)) {
            vv.push(e);
          }
        });
        if (vv.length > 0) v = vv;
      }

      if (v.length == 2 && typeof v[0] == 'number' && typeof v[1] == 'number') {
        v.sort(function(a,b){ return (a - b) });
        v = Math.floor(Math.random()*(v[1]-v[0]+1)+v[0]);
      } else {
        index = Math.floor(Math.random()*(v.length));
        v = v[index];
      }
    }
    return v;
  },

  decimalRange : function(v) {
    if (v > 1) v = v/100;
    return v;
  }
}

// src/modules/origin.js
Abstract.Modules.Origin = function(options) {
  this.origin = function(origin) {
    if (origin) {
      this._origin = this.buildOrigin(origin);
      if (this.reposition) this.reposition();
      return this;
    } else {
      if (!this._origin) {
        this._origin = this.options.origin;
      }
    }
    this._origin = this.buildOrigin(this._origin);
    return (this._origin) ? this._origin : this.parent().origin();
  }

  this.buildOrigin = function(origin) {
    if (origin && origin.class_name != 'Abstract.Point') {
      origin = new Abstract.Point(origin);
      origin.parent((this.parent) ? this.parent() : this);
    }
    return origin;
  }
  return this;
}

// src/modules/parent.js
Abstract.Modules.Parent = function(options) {
  this.parent = function(parent) {
    if (parent) {
      this._parent = parent;
    } else {
      if (!this._parent) {
        this._parent = this.options.parent;
      }
    }
    return this._parent;
  }
  return this;
}

// src/modules/shape.js
Abstract.Modules.Shape = function(options) {
  this.paper = function() {
    return (this._paper) ? this._paper : this.parent().paper();
  }
  this.draw = function() {
    this.fill();
    this.stroke();
    this.rotate();
    this.opacity();
    return this;
  }

  this.x = function() {
    if (!this._x) {
      this._x = this.origin().x();
    }
    return this._x;
  }

  this.y = function() {
    if (!this._y) {
      this._y = this.origin().y();
    }
    return this._y;
  }

  this.reposition = function() {
    this.element().attr({
      x : this.x(),
      y : this.y()
    });

    this.stroke();
    return this;
  }

  this.resize = function() {
    this.element().attr({
      width : this.width(),
      height : this.height()
    });
    return this.reposition();
  }

  this.fill = function(fill) {
    if (fill != null) {
      this._fill = Abstract.utilites.random(fill);
    } else {
      if (this._fill == null) {
        this._fill = Abstract.utilites.random(this.options.fill);
      }
    }
    if (this.element()) {
      this.element().attr({ 'fill' : this._fill });
    }
    return (fill != null) ? this : this._fill;
  }

  this.stroke = function(stroke) {
    if (stroke != null) {
      this._stroke = Abstract.utilites.random(stroke);
    } else {
      if (this._stroke == null) {
        this._stroke = Abstract.utilites.random(this.options.stroke);
      }
    }
    if (this._stroke && this._stroke.class_name != 'Abstract.Stroke') this._stroke = new Abstract.Stroke(this._stroke);
    if (this._stroke && (this._stroke.position() == 'inside' || this._stroke.position() == 'outside')) {
      this.strokeElement();
    } else {
      this.clearStroke();
      if (this.element() && this._stroke) {
        this.element().attr({
          'stroke' : this._stroke.color(),
          'stroke-width' : this._stroke.width(),
          'stroke-opacity' : (this._stroke && this._stroke.opacity()) ? this._stroke.opacity() : this._opacity
        });
      }
    }
    return (stroke != null) ? this : this._stroke;
  }

  this.clearStroke = function() {
    if (this.element()) {
      this.element().attr({
        'stroke' : 'none',
        'stroke-width' : 0
      });
    }
    if (this._stroke_element) {
      this._stroke_element.element().remove();
      this._stroke_element = null;
    }
  }

  this.strokeElement = function() {
    this.clearStroke();
    var klass = eval(this.class_name);
    this._stroke_element = new klass({
      fill : false,
      rotate : this._rotate,
      parent : this.parent(),
      origin : { x : this.x(), y : this.y() },
      width : this.width() + ((this._stroke.position() == 'inside') ? -this._stroke.width() : this._stroke.width()),
      height : this.height() + ((this._stroke.position() == 'inside') ? -this._stroke.width() : this._stroke.width()),
      thickness : (this.thickness) ? (this.thickness() + ((this._stroke.position() == 'inside') ? -this._stroke.width() : this._stroke.width())) : 0,
      stroke : { color : this._stroke.color(), width : this._stroke.width(), opacity : (this._stroke && this._stroke.opacity()) ? this._stroke.opacity() : this._opacity }
    }).draw();
  }

  this.opacity = function(opacity) {
    if (opacity != null) {
      this._opacity = Abstract.utilites.decimalRange(Abstract.utilites.random(opacity));
    } else {
      if (this._opacity == null) {
        this._opacity = Abstract.utilites.decimalRange(Abstract.utilites.random(this.options.opacity));
      }
    }

    if (this.element()) {
      this.stroke();
      this.element().attr({ 'fill-opacity' : this._opacity });
    }

    return (opacity != null) ? this : this._opacity;
  }

  this.rotate = function(rotate) {
    if (rotate != null) {
      this._rotate = Abstract.utilites.random(rotate);
    } else {
      if (this._rotate == null) {
        this._rotate = Abstract.utilites.random(this.options.rotate);
      }
    }

    if (this.element()) {
      this.stroke();
      this.element().rotate(this._rotate);
    }

    return (rotate != null) ? this : this._rotate;
  }

  return this;
}

// src/modules/size.js
Abstract.Modules.Size = function(options) {
  this.size = function(size)
  {
    if (size) {
      this._size = Abstract.utilites.random(size);
      if (this.resize) this.resize();
      return this;
    } else {
      if (!this._size) {
        this._size = Abstract.utilites.random(this.options.size);
      }
    }

    return this._size;
  }

  this.width = function(width) {
    if (width) {
      this._width = Abstract.utilites.random(width);
      if (this.resize) this.resize();
      return this
    } else {
      if (!this._width) {
        this._width = (this.size()) ? this.size() : Abstract.utilites.random(this.options.width);
      }
    }

    return this._width;
  }

  this.height = function(height) {
    if (height) {
      this._height = Abstract.utilites.random(height);
      if (this.resize) this.resize();
      return this;
    } else {
      if (!this._height) {
        this._height = (this.size()) ? this.size() : Abstract.utilites.random(this.options.height);
      }
    }

    return this._height;
  }
  return this;
}

// src/objects/canvas.js
Abstract.Canvas = function(options) {
  this.options = Abstract.utilites.options(options, {
    element : null,
    width : 0,
    height : 0,
    origin : new Abstract.Point({ x : '50%', y : '50%', parent : this }),
    background : '#fff',
    draw : function(canvas) {}
  });

  this.element = function() {
    if (!this._element) {
      this._element = this.options.element;
    }
    return this._element;
  }

  this.paper = function() {
    if (!this._paper) {
      this._paper = Raphael(this.element(), this.width(), this.height());
    }
    return this._paper;
  }

  this.background = function(background) {
    if (!this._background) {
      if (background.class_name == 'Abstract.Gradient' && background.type() == 'radial') {
        var size = Math.ceil(Math.sqrt(
          Math.pow(this.width(), 2) +
          Math.pow(this.height(), 2)
        ));
        this._background = new Abstract.Ellipse({
          size : size,
          fill : background,
          stroke : false,
          parent : this,
          origin : new Abstract.Point({ x : '50%', y : '50%' })
        }).draw();
      } else {
        this._background = new Abstract.Rectangle({
          width : this.width(),
          height : this.height(),
          fill : background,
          stroke : false,
          parent : this,
          origin : new Abstract.Point({ x : '50%', y : '50%' })
        }).draw();
      }
    } else {
      this._background.fill(background);
    }
    return this;
  }

  this.gradient = function(options){
    return new Abstract.Gradient(options);
  }

  this.stroke = function(options){
    return new Abstract.Stroke(options);
  }

  this.rectangle = function(options, auto_draw){
    var rectangle = new Abstract.Rectangle(options);
    rectangle.parent(this);
    if (auto_draw !== false) rectangle.draw();
    return rectangle;
  }

  this.square = function(options, auto_draw){
    return this.rectangle(options, auto_draw);
  }

  this.ellipse = function(options, auto_draw){
    var ellipse = new Abstract.Ellipse(options);
    ellipse.parent(this);
    if (auto_draw !== false) ellipse.draw();
    return ellipse;
  }

  this.circle = function(options, auto_draw){
    return this.ellipse(options, auto_draw);
  }

  this.cross = function(options, auto_draw){
    var cross = new Abstract.Cross(options);
    cross.parent(this);
    if (auto_draw !== false) cross.draw();
    return cross;
  }

  this.point = function(options){
    point = new Abstract.Point(options);
    point.parent(this);
    return point;
  }

  this.repeat = function(times, func){
    if (times && func) {
      for (var i=0; i < Abstract.utilites.random(times); i++) {
        func();
      };
    }
  }
  this.redraw = function(){
    if (this.options.draw) {
      this.paper().clear();
      this._background = null;
      this.options.draw(this);
    }
  }
  if (this.options.draw) {
    this.options.draw(this);
  }
};
Abstract.Modules.Size.call(Abstract.Canvas.prototype);
Abstract.Modules.Origin.call(Abstract.Canvas.prototype);

// src/objects/gradient.js
Abstract.Gradient = function(options){
  this.class_name = 'Abstract.Gradient';
  this.options = Abstract.utilites.options(options, {
    type : 'linear',
    angle : 0,
    start : '#fff',
    end : '#000',
    colors : null,
    origin : new Abstract.Point({ x : 0.5, y : 0.5 })
  });

  this.x = function(){
    return Abstract.utilites.decimalRange(this.origin().x());
  }

  this.y = function(){
    return Abstract.utilites.decimalRange(this.origin().y());
  }

  this.generate = function(){
    var type = Abstract.utilites.random(this.options.type);
    var angle = Abstract.utilites.random(this.options.angle);
    var start = Abstract.utilites.random(this.options.start);
    var end = Abstract.utilites.random(this.options.end, start);

    var prefix = angle+'-';
    if (type == 'radial') {
      prefix = 'r('+this.x()+', '+this.y()+')';
    }

    if (this.options.colors) {
      start = Abstract.utilites.random(this.options.colors);
      end = Abstract.utilites.random(this.options.colors, start);
    }
    return prefix+start+'-'+end;
  }

  this.type = function(type){
    if (type) {
      this._type = Abstract.utilites.random(type);
      return this;
    } else {
      if (!this._type) {
        this._type = Abstract.utilites.random(this.options.type);
      }
    }

    return this._type;
  }
}

Abstract.Modules.Origin.call(Abstract.Gradient.prototype);

// src/objects/point.js
Abstract.Point = function(options){
  this.class_name = 'Abstract.Point';
  this.options = Abstract.utilites.options(options, {
    x : 0,
    y : 0,
    parent : null
  });

  this.x = function(){
    var x = this.options.x;
    if (this.parent()) {
      x = Abstract.utilites.parseMeasurement(this.options.x, this.parent().width());
    }
    return Abstract.utilites.random(x);
  }

  this.y = function(){
    var y = this.options.y;
    if (this.parent()) {
      y = Abstract.utilites.parseMeasurement(this.options.y, this.parent().height());
    }
    return Abstract.utilites.random(y);
  }
};
Abstract.Modules.Parent.call(Abstract.Point.prototype);
Abstract.Modules.Origin.call(Abstract.Point.prototype);


//
// src/objects/stroke.js
//

Abstract.Stroke = function(options){
  this.class_name = 'Abstract.Stroke';

  this.options = Abstract.utilites.options(options, {
    width : 1,
    color : '#000',
    opacity : null,
    position : 'normal'
  });

  this.width = function(width){
    if (width) {
      this._width = width;
      return this;
    } else {
      if (!this._width) {
        this._width = Abstract.utilites.random(this.options.width);
      }
    }
    return this._width;
  }

  this.color = function(){
    if (!this._color) {
      this._color = Abstract.utilites.random(this.options.color);
    }

    return this._color;
  }

  this.opacity = function(){
    if (!this._opacity) {
      this._opacity = Abstract.utilites.decimalRange(Abstract.utilites.random(this.options.opacity));
    }

    return this._opacity;
  }

  this.position = function(){
    if (!this._position) {
      p = Abstract.utilites.random(this.options.position);
      this._position = (p == 'inside' || p == 'outside') ? p : 'normal';
    }

    return this._position;
  }
};


//
// src/shapes/cross.js
//

Abstract.Cross = function(options) {

  this.class_name = 'Abstract.Cross';

  this.options = Abstract.utilites.options(options, {
    size : null,
    width : 0,
    height : 0,
    parent : null,
    opacity : 1,
    thickness : 0,
    background : '#fff',
    stroke : new Abstract.Stroke(),
    origin : null,
    rotate : 0
  });

  this.element = function()
  {
    if (!this._element) {

      start_x = this.x() - this.thickness()/2;
      start_y = this.y() - this.thickness()/2;
      width = (this.width() - this.thickness())/2;
      height = (this.height() - this.thickness())/2;

      this._element = this.paper().path(
        'M'+start_x+','+start_y +
        'v-'+height+'h'+this.thickness()+'v'+height +
        'h'+width+'v'+this.thickness()+'h-'+width +
        'v'+height+'h-'+this.thickness()+'v-'+height +
        'h-'+width+'v-'+this.thickness()+'Z'
      );
    }
    return this._element;
  }

  this.redraw = function()
  {
    this.element().remove();
    this._element = null;
    this.draw();
  }

  this.reposition = function()
  {
    this.redraw();
    return this;
  }

  this.resize = function()
  {
    this.redraw();
    return this;
  }

  this.thickness = function(thickness)
  {
    if (thickness) {
      this._thickness = Abstract.utilites.random(thickness);
      if (this.resize) this.resize();
      return this;
    } else {
      if (!this._thickness) {
        this._thickness = Abstract.utilites.random(this.options.thickness);
      }
    }

    return this._thickness;
  }
};

Abstract.Modules.Size.call(Abstract.Cross.prototype);
Abstract.Modules.Shape.call(Abstract.Cross.prototype);
Abstract.Modules.Parent.call(Abstract.Cross.prototype);
Abstract.Modules.Origin.call(Abstract.Cross.prototype);


//
// src/shapes/ellipse.js
//

Abstract.Ellipse = function(options) {

  this.class_name = 'Abstract.Ellipse';

  this.options = Abstract.utilites.options(options, {
    size : null,
    width : 0,
    height : 0,
    parent : null,
    opacity : 1,
    background : '#fff',
    stroke : new Abstract.Stroke(),
    origin : null,
    rotate : 0
  });

  this.element = function()
  {
    if (!this._element) {
      this._element = this.paper().ellipse(this.x(), this.y(), this.width()/2, this.height()/2);
    }
    return this._element;
  }

  this.reposition = function()
  {
    this.element().attr({
      cx : this.x(),
      cy : this.y()
    });

    this.stroke();
    return this;
  }

  this.resize = function()
  {
    this.element().attr({
      rx : this.width()/2,
      ry : this.height()/2
    });

    return this.reposition();
  }
};

Abstract.Modules.Size.call(Abstract.Ellipse.prototype);
Abstract.Modules.Shape.call(Abstract.Ellipse.prototype);
Abstract.Modules.Parent.call(Abstract.Ellipse.prototype);
Abstract.Modules.Origin.call(Abstract.Ellipse.prototype);

// src/shapes/rectangle.js
Abstract.Rectangle = function(options) {

  this.class_name = 'Abstract.Rectangle';

  this.options = Abstract.utilites.options(options, {
    size : null,
    width : 0,
    height : 0,
    parent : null,
    opacity : 1,
    background : '#fff',
    stroke : new Abstract.Stroke(),
    origin : null,
    rotate : 0
  });

  this.element = function()
  {
    if (!this._element) {
      this._element = this.paper().rect(this.offsetX(), this.offsetY(), this.width(), this.height());
    }
    return this._element;
  }

  this.reposition = function()
  {
    this.element().attr({
      x : this.offsetX(),
      y : this.offsetY()
    });

    this.stroke();
    return this;
  }

  this.offsetX = function()
  {
    return this.x() - (this.width()/2);
  }

  this.offsetY = function()
  {
    return this.y() - (this.height()/2);
  }
};

Abstract.Modules.Size.call(Abstract.Rectangle.prototype);
Abstract.Modules.Shape.call(Abstract.Rectangle.prototype);
Abstract.Modules.Parent.call(Abstract.Rectangle.prototype);
Abstract.Modules.Origin.call(Abstract.Rectangle.prototype);
