function math_cal() {

	this.add_up=function(n){
		var sum=0;
		var max_multiple = Math.floor(1000/n);
		for(i=1;i<=max_multiple;i++){
			temp=sum + (n * i) ;
			if(temp<1000){
				sum=temp;
			} 
			else{
				return sum;
			}
		}
	}
}

var obj = new math_cal();
var sum_of_three = obj.add_up(3);
var sum_of_five = obj.add_up(5);

console.log("final sum of 3 and 5 is ::"+(sum_of_three+sum_of_five)

