export class HeavyService {
  run() {
    return 'heavy:' + 'x'.repeat(4096);
  }
}
