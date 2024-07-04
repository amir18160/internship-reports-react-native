interface ActivityItem {
  title: string;
  value: string;
}

class ActivityDataProcessor {
  private data: ActivityItem[];

  constructor(data: ActivityItem[]) {
    this.data = data;
  }

  public processData(): ActivityItem[][] {
    const processedData: ActivityItem[][] = [[], []];

    this.data.forEach((item, index) => {
      if (index < 2) {
        processedData[0].push(item);
      } else {
        processedData[1].push(item);
      }
    });

    return processedData;
  }
}

// Example usage:
const userActivityData = [
  { title: "فعالیت هفته", value: "16" },
  { title: "فعالیت هفته قبل", value: "43" },
  { title: "فعالیت ماه قبل", value: "91" },
  { title: "فعالیت کل", value: "392" },
];

const processor = new ActivityDataProcessor(userActivityData);
const processedData = processor.processData();

console.log(processedData);
