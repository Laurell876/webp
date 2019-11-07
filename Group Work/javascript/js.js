//Ensuring Script is Loaded into Page
console.log("Javascript");

//Defining Functions
function getArrayById(id)
{
	var counter =  0
	var array   = [ ];
	//Adding Elements with Given id Parameter as in numerical order in the HTML Page
	while(document.getElementById(id + counter) !== null)
	{
		array[counter] = document.getElementById(id + counter)
		counter++;
	}
	//returning the array if there is no element with a the
	return array;
}


function setArrayAttribute(arr, attribute, command)
{
	for(var counter = 0, count = arr.length; counter < count; counter++)
	{
		arr[counter].setAttribute(attribute,command);
	}
	return arr;
}


function getSelectValue(arr)
{
	var return_arr = [];
	for(let counter = 0, count = arr.length; counter < count; counter++)
	{
		if(isNaN(parseFloat(arr[counter].value)))
		{return_arr[counter] = 0;}
		else
		{return_arr[counter] = parseFloat(arr[counter].value);}
	}
	return return_arr;
}


function calculateCarTotal()
{
	let vehiclePrice_arr = getSelectValue(getArrayById('year'));
	let quantity_arr = getSelectValue(getArrayById('quantity'));
	let price_arr = getArrayById('price');
	let return_arr = [];
	for(let counter = 0, count = price_arr.length; counter < count; counter++)
	{
		return_arr[counter] = vehiclePrice_arr[counter] * quantity_arr[counter];
	}
	return return_arr;
}

function setValuesInElements(htmlElements, values)
{
	if(htmlElements.length == values.length)
	{
		for(let counter = 0, count = htmlElements.length; counter < count; counter++)
		{
			htmlElements[counter].value = values[counter];
		}
	}
	else
	{
		console.warn("setElements() requires arrays of equal length");
	}
}

function subTotal()
{
	let addends = getArrayById("price");
	let sum = 0;
	for(let counter = 0, count = addends.length; counter < count; counter++)
	{
		sum += parseFloat(addends[counter].value);
	}
	return sum;
}

function tax()
{
	let tax = parseFloat(document.getElementById('tax').value);
	return (isNaN(tax) ? 0 : tax);
}

function randomFormInformation()
{
	let invoiceNum = document.getElementById("invoice1").value = parseInt(Math.random() * 10**12);
}

function submitOrder()
{
	let orders = [ ];
	let car_details = [ ];
	let append = "";
	let msg = "";
	let price_arr = getArrayById('price');
	let array_counter = 0;
	//DEBUGGING//console.log("price_arr:\n" + price_arr);
	for(let counter = 0, count = price_arr.length; counter < count ; counter++)
	{
		if(price_arr[counter].value != "0")
		{
			orders[array_counter] = counter;
			array_counter++;
		}
	}
	//DEBUGGING//
	console.log("Orders:\n " + orders);
	for(let counter = 0, count = orders.length; counter < count ; counter++)
	{
		console.log("orders[counter]: "+orders[counter]);
		let selectElementValue = new RegExp(document.getElementById('year' + orders[counter]).value);
		console.log("selectElementValue: "+selectElementValue);
		for(let counter2 = 0, count2 = document.getElementById('year' + orders[counter]).children.length; counter2 < count2; counter2++)
		{
			if(selectElementValue.test(document.getElementById('year' + orders[counter]).children[counter2].innerHTML) == true)
			{
				car_details[counter] = document.getElementById('year' + orders[counter]).children[counter2].innerHTML;
			}
		}
	}

	for(let counter = 0, count = orders.length; counter < count ; counter++)
	{
		msg += `${document.getElementById('label'+orders[counter]).innerHTML} ${car_details[counter]} Quantity: ${document.getElementById('quantity'+orders[counter]).value} Price: $${document.getElementById('price'+orders[counter]).value}` + "\n";
	}

	msg = "CART:\n\n" + msg + `\nTotal + Tax (USD): $${document.getElementById('total').value}\n`+"\nProceed to Checkout? [Y/N]";
	console.log(orders);
	console.log(car_details);

	switch (prompt(msg)) {
		case "Y":
		case "y":
			alert("Purchased :)");
			break;
		default:
			alert("Not Purchased :(");
	};

	return msg;
}

function email()
{
   let recipient = document.getElementById("email1").value;
   let subject	= "Car%20Dealership%20Email";
   let body = "Email%20Body";
   let cc = "dealership@example.com";
   if(recipient === "")
   {
      alert("No email has been entered");
      return;
   }
   let mailto = "mailto:" + recipient + "?cc=" + cc + "&subject=" + subject + "&body=" + body;
   alert("Link Constructed:\n" + mailto);
   window.location.href = mailto;
}

function update()
{
	setValuesInElements(getArrayById('price'),calculateCarTotal());
	document.getElementById('subtotal').value = subTotal();
	document.getElementById('tax').value = tax();
	document.getElementById('total').value = subTotal() + ((tax() * 0.01) * subTotal());
}

update();
randomFormInformation();
document.getElementById('submit').setAttribute('onclick','submitOrder()');
document.getElementById('email101').setAttribute('onclick','email()');
document.getElementById('exit101').setAttribute('onclick','alert("Thank You For Shopping with Us :\)")');
setArrayAttribute(getArrayById('quantity'), "onchange", "update()");
setArrayAttribute(getArrayById('year'), "onchange", "update()");
setArrayAttribute([document.getElementById("tax")], "onchange", "update()");
