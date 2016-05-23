 'use strict';

function parseNum(num){
	var list = String(num).split('').reverse();
	var temp = [];

	for(var i = 0, len = list.length; i < len; i = i + 3){
		temp.push(list.slice(i, i + 3).join(''));
	}
	
	return temp.join(',').split('').reverse().join('');
}
console.log(parseNum(10000121213));
