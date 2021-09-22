Feature: Login to automationpractice

	Scenario: Login with valid credentials
		Given User login with valid account
		When User enters valid "<username>" and "<password>"
		Then User can logged in successfully

        Examples:
            |username|password|
            |dsafdsfsfdas@ggg.cc|32132ASDzdasd|

	Scenario: Login with invalid credentials
		Given User login with invalid account
		When User enters invalid "<username>" and "<password>"
		Then User gets error message

        Examples:
            |username|password|
            |dsafdsfsfdsadas@ggg.cc|4323321342asda4|

	Scenario: Create new account
		Given User visits for creating account
		When User "<username>" and "<password>" and "<firstname>" and "<lastname>" and "<gender>" and "<dateofbirth_day>" and "<dateofbirth_month>" and "<dateofbirth_years>" and "<address>" and "<state>" and "<zipcode>" and "<phone>" and "<alias>" and "<city>"
		Then User Created successfully

		Examples:
            |username|password|firstname|lastname|gender|dateofbirth_day|dateofbirth_month|dateofbirth_years|address|state|zipcode|phone|alias|city|
            |dsafdsfdsafdsfdas@ggg.cc|3asdafsF14sd|firstname|lastname|M|8|3|1995|Adress|4|06200|5555555555|cucumber|Ankara|

		
	
	Scenario: Adding item to cart
		Given User access to site for buying something
		When User enters category and item name "<category>" and "<item>" and "<bulk>"
		Then User add item

        Examples:
            |category|item|bulk|
            |Women|Chiffon|3|
