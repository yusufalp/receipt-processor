/**
 * One point for every alphanumeric character in the retailer name.
 * 50 points if the total is a round dollar amount with no cents.
 * 25 points if the total is a multiple of 0.25.
 * 5 points for every two items on the receipt.
 * If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
 * 6 points if the day in the purchase date is odd.
 * 10 points if the time of purchase is after 2:00pm and before 4:00pm.
 */

export default class Points {
  constructor(receipt, points = 0) {
    this.receipt = receipt;
    this.points = points;
  }

  inRetailerName() {
    const regex = /[a-zA-Z0-9]/;

    for (let char of this.receipt.retailer) {
      if (regex.test(char)) {
        this.points++;
      }
    }
  }

  inDollarAmount() {
    if (parseFloat(this.receipt.total) % 1 === 0) {
      this.points += 50;
    }

    if (parseFloat(this.receipt.total) % 0.25 === 0) {
      this.points += 25;
    }
  }

  inNumberOfItems() {
    this.points += Math.floor(this.receipt.items.length / 2) * 5;
  }

  inItemDescription() {
    for (let item of this.receipt.items) {
      if (item.shortDescription.trim().length % 3 === 0) {
        let point = Math.ceil(parseFloat(item.price) * 0.2);
        this.points += point;
      }
    }
  }

  inDate() {
    const day = this.receipt.purchaseDate.substring(
      this.receipt.purchaseDate.length - 2
    );

    if (parseInt(day) % 2 !== 0) {
      this.points += 6;
    }
  }

  inTime() {
    const [hour, minute] = this.receipt.purchaseTime.split(":");

    const totalMinutes = parseInt(hour) * 60 + parseInt(minute);

    if (totalMinutes > 840 && totalMinutes < 960) {
      this.points += 10;
    }
  }

  calculatePoints() {
    this.inRetailerName();
    this.inDollarAmount();
    this.inNumberOfItems();
    this.inItemDescription();
    this.inDate();
    this.inTime();
  }

  getPoints() {
    this.calculatePoints();

    return this.points;
  }
}
