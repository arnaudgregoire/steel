function radians(degrees)
{
  return degrees * (Math.PI/180);
}

function degrees(radians)
{
  return radians * (180/Math.PI);
}

function rotate(x,y,z,angle,axis){
  var x_, y_, z_;
  switch(axis){
    case 'x':
      x_ = x;
      y_ = y*Math.cos(angle) - z*Math.sin(angle);
      z_ = y*Math.sin(angle) + z*Math.cos(angle)
      break;

    case 'y':
      x_ = z*Math.sin(angle) + x*Math.cos(angle);
      y_ = y;
      z_ = z*Math.cos(angle) - x*Math.sin(angle);
      break;

    case 'z':
      x_ = x*Math.cos(angle) - y*Math.sin(angle);
      y_ = x*Math.sin(angle) + y*Math.cos(angle);
      z_ = z;
      break;
  }
  return [x_,y_,z_];
}
