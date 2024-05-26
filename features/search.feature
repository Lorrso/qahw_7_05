Feature: Cinema testing
    Scenario: Should purchase a standart ticket
        Given user is on "/client/index.php" page
        When user select next date
        When user goes to the page of the Micky Mouse hall
        When selects a "standart" ticket
        When presses the ".acceptin-button" to buying a ticket
        When presses the ".acceptin-button" to confirm the reservation
        Then user sees "Электронный билет" title

    Scenario: Should purchase a VIP ticket
        Given user is on "/client/index.php" page
        When user select next date
        When user goes to the page of the Micky Mouse hall
        When selects a "vip" ticket
        When presses the ".acceptin-button" to buying a ticket
        When presses the ".acceptin-button" to confirm the reservation
        Then user sees "Электронный билет" title

    Scenario: Should not lead to the booking page when trying to purchase a disabled ticket
        Given user is on "/client/index.php" page
        When user select next date
        When user goes to the page of the Micky Mouse hall
        When selects a "disabled" ticket
        When presses the ".acceptin-button" to buying a ticket
        Then user stays on the "/client/hall.php" page