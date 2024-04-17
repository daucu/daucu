export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return (
      <div className="w-full h-full justify-center items-center flex">
        <div className="loading">
          <div className="loading__container">
            <div className="loading__circle"></div>
            <div className="loading__circle"></div>
            <div className="loading__circle"></div>
          </div>
        </div>
      </div>
    );
  }
  