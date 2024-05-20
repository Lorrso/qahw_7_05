Feature: Buying a standart ticket
    Scenario Outline: Should purchase a standart ticket
        Given user is on "/client/index.php" page
        When user goes to the page of the "a[data-seance-id='199']" hall
        When selects a "standart" ticket
        When presses the ".acceptin-button" to confirm the reservation
        Then user sees the ".ticket__info-qr"

Feature: Buying a VIP ticket
    Scenario Outline: Should purchase a VIP ticket
        Given user is on "/client/index.php" page
        When user goes to the page of the "a[data-seance-id='199']" hall
        When selects a "vip" ticket
        When presses the ".acceptin-button" to buying a ticket
        When presses the ".acceptin-button" to confirm the reservation
        Then user sees the ".ticket__info-qr"

Feature: Trying to buy an already purchased ticket
    Scenario Outline: Should not lead to the booking page
        Given user is on "/client/index.php" page
        When user goes to the page of the "a[data-seance-id='199']" hall
        When selects a "disabled" ticket
        When presses the ".acceptin-button" to buying a ticket
        Then user stays on the "/client/hall.php" page