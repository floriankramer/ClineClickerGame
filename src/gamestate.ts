export class GameState {
  public count: number;
  public perClick: number;
  public perSecond: number;

  constructor() {
    this.count = 1;
    this.perClick = 1;
    this.perSecond = 0;
  }

  public increment(): void {
    this.count += this.perClick;
  }

  public startAutoIncrement(): void {
    setInterval(() => {
      this.count += this.perSecond;
    }, 1000);
  }

  public purchaseUpgrade(cost: number, perClickBonus: number, perSecondBonus: number): boolean {
    // Check if player has enough resources
    if (this.count >= cost) {
      // Deduct the cost
      this.count -= cost;
      
      // Apply the bonuses
      this.perClick += perClickBonus;
      this.perSecond += perSecondBonus;
      
      return true;
    }
    
    return false;
  }
}
