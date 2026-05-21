import Image from "next/image";
import Chat from "@/components/Chat";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div className={styles.warriorWrap}>
          <Image
            src="/warrior.svg"
            alt="Warrior victorious after battle"
            width={88}
            height={88}
            className={styles.warriorImage}
            priority
          />
        </div>
        <div className={styles.headerText}>
          <h1>Mental Coach</h1>
          <p>
            Your supportive coach for stress, motivation, habits, and
            confidence — powered by AI.
          </p>
        </div>
      </header>

      <main className={styles.main}>
        <Chat />
      </main>
    </div>
  );
}
