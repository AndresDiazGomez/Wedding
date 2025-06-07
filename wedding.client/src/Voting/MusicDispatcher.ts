export type MusicDispatcherCallback = () => void;

export class MusicDispatcher {
	private subscribers: Set<MusicDispatcherCallback> = new Set();

	subscribe(callback: MusicDispatcherCallback): () => void {
		this.subscribers.add(callback);
		return () => this.unsubscribe(callback);
	}

	unsubscribe(callback: MusicDispatcherCallback): void {
		this.subscribers.delete(callback);
	}

	playNewSong(): void {
		this.subscribers.forEach((cb) => cb());
	}
}
