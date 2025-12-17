// Dictionary storage matching original XWORD.TXT bucket organization
// Words organized by length (3-16) and first-letter bucket (1-8)
// Buckets: 1=a-b, 2=c-d, 3=e-g, 4=h-k, 5=l-o, 6=p-r, 7=s, 8=t-z

const STORAGE_KEY = 'xword_dictionary';

export class Dictionary {
  // Map key format: "L{length}.{bucket}" matching original ProDOS filenames
  private words: Map<string, string[]> = new Map();

  constructor() {
    this.load();
  }

  // Get bucket number (1-8) for a word based on first letter
  static getBucket(word: string): number {
    const firstChar = word.toLowerCase().charCodeAt(0);

    if (firstChar <= 98) return 1; // a-b (97-98)
    if (firstChar <= 100) return 2; // c-d (99-100)
    if (firstChar <= 103) return 3; // e-g (101-103)
    if (firstChar <= 107) return 4; // h-k (104-107)
    if (firstChar <= 111) return 5; // l-o (108-111)
    if (firstChar <= 114) return 6; // p-r (112-114)
    if (firstChar === 115) return 7; // s (115)
    return 8; // t-z (116-122)
  }

  // Get the key for a word
  static getKey(word: string): string {
    const length = word.length;
    const bucket = Dictionary.getBucket(word);
    return `L${length}.${bucket}`;
  }

  // Add a word to the dictionary
  addWord(word: string): boolean {
    const normalized = word.toLowerCase().trim();

    // Validate: 3-16 characters, letters only
    if (normalized.length < 3 || normalized.length > 16) return false;
    if (!/^[a-z]+$/.test(normalized)) return false;

    const key = Dictionary.getKey(normalized);
    const bucket = this.words.get(key) || [];

    // Check for duplicates
    if (bucket.includes(normalized)) return false;

    bucket.push(normalized);
    bucket.sort();
    this.words.set(key, bucket);
    this.save();
    return true;
  }

  // Remove a word from the dictionary
  removeWord(word: string): boolean {
    const normalized = word.toLowerCase().trim();
    const key = Dictionary.getKey(normalized);
    const bucket = this.words.get(key);

    if (!bucket) return false;

    const index = bucket.indexOf(normalized);
    if (index === -1) return false;

    bucket.splice(index, 1);
    this.save();
    return true;
  }

  // Get all words of a specific length and bucket
  getWords(length: number, bucket: number): string[] {
    const key = `L${length}.${bucket}`;
    return this.words.get(key) || [];
  }

  // Get all words of a specific length
  getWordsByLength(length: number): string[] {
    const allWords: string[] = [];
    for (let bucket = 1; bucket <= 8; bucket++) {
      allWords.push(...this.getWords(length, bucket));
    }
    return allWords.sort();
  }

  // Get total word count
  getTotalCount(): number {
    let count = 0;
    this.words.forEach(bucket => {
      count += bucket.length;
    });
    return count;
  }

  // Get count for a specific file
  getFileCount(length: number, bucket: number): number {
    return this.getWords(length, bucket).length;
  }

  // Save to localStorage
  private save(): void {
    try {
      const data: Record<string, string[]> = {};
      this.words.forEach((value, key) => {
        data[key] = value;
      });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.error('Failed to save dictionary:', e);
    }
  }

  // Load from localStorage
  private load(): void {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const data = JSON.parse(stored) as Record<string, string[]>;
        this.words = new Map(Object.entries(data));
      } else {
        // Load initial sample words
        this.loadSampleWords();
      }
    } catch (e) {
      console.error('Failed to load dictionary:', e);
      this.loadSampleWords();
    }
  }

  // Load sample crossword words
  private loadSampleWords(): void {
    const sampleWords = [
      // 3-letter words
      'ace', 'add', 'age', 'aid', 'aim', 'air', 'all', 'and', 'ant', 'any',
      'ape', 'arc', 'are', 'ark', 'arm', 'art', 'ash', 'ask', 'ate', 'awe',
      'axe', 'bad', 'bag', 'ban', 'bar', 'bat', 'bay', 'bed', 'bee', 'bet',
      'bid', 'big', 'bin', 'bit', 'bow', 'box', 'boy', 'bud', 'bug', 'bus',
      'but', 'buy', 'cab', 'can', 'cap', 'car', 'cat', 'cop', 'cow', 'cry',
      'cub', 'cup', 'cut', 'dad', 'dam', 'day', 'den', 'dew', 'did', 'die',
      'dig', 'dim', 'dip', 'dog', 'dot', 'dry', 'dub', 'due', 'dug', 'dye',
      'ear', 'eat', 'eel', 'egg', 'ego', 'elk', 'elm', 'emu', 'end', 'era',
      'eve', 'eye', 'fad', 'fan', 'far', 'fat', 'fax', 'fed', 'fee', 'few',
      'fig', 'fin', 'fir', 'fit', 'fix', 'fly', 'foe', 'fog', 'for', 'fox',
      'fry', 'fun', 'fur', 'gap', 'gas', 'get', 'gin', 'got', 'gum', 'gun',
      'gut', 'guy', 'gym', 'had', 'ham', 'has', 'hat', 'hay', 'hen', 'her',
      'hid', 'him', 'hip', 'his', 'hit', 'hog', 'hop', 'hot', 'how', 'hub',
      'hue', 'hug', 'hut', 'ice', 'icy', 'ill', 'imp', 'ink', 'inn', 'ion',
      'its', 'ivy', 'jab', 'jam', 'jar', 'jaw', 'jay', 'jet', 'jig', 'job',
      'jog', 'joy', 'jug', 'key', 'kid', 'kin', 'kit', 'lab', 'lad', 'lag',
      'lap', 'law', 'lay', 'lea', 'led', 'leg', 'let', 'lid', 'lie', 'lip',
      'lit', 'log', 'lot', 'low', 'lug', 'mad', 'man', 'map', 'mat', 'may',
      'men', 'met', 'mid', 'mix', 'mob', 'mom', 'mop', 'mud', 'mug', 'nab',
      'nag', 'nap', 'net', 'new', 'nil', 'nip', 'nod', 'nor', 'not', 'now',
      'nut', 'oak', 'oar', 'oat', 'odd', 'ode', 'off', 'oft', 'oil', 'old',
      'one', 'opt', 'orb', 'ore', 'our', 'out', 'owe', 'owl', 'own', 'pad',
      'pal', 'pan', 'par', 'pat', 'paw', 'pay', 'pea', 'peg', 'pen', 'pep',
      'per', 'pet', 'pie', 'pig', 'pin', 'pit', 'ply', 'pod', 'pop', 'pot',
      'pro', 'pry', 'pub', 'pun', 'pup', 'put', 'rag', 'ram', 'ran', 'rap',
      'rat', 'raw', 'ray', 'red', 'ref', 'rib', 'rid', 'rig', 'rim', 'rip',
      'rob', 'rod', 'rot', 'row', 'rub', 'rug', 'run', 'rut', 'rye', 'sad',
      'sag', 'sap', 'sat', 'saw', 'say', 'sea', 'set', 'sew', 'she', 'shy',
      'sin', 'sip', 'sir', 'sis', 'sit', 'six', 'ski', 'sky', 'sly', 'sob',
      'sod', 'son', 'sop', 'sot', 'sow', 'soy', 'spa', 'spy', 'sub', 'sue',
      'sum', 'sun', 'tab', 'tad', 'tag', 'tan', 'tap', 'tar', 'tax', 'tea',
      'ten', 'the', 'thy', 'tic', 'tie', 'tin', 'tip', 'toe', 'ton', 'too',
      'top', 'tow', 'toy', 'try', 'tub', 'tug', 'two', 'urn', 'use', 'van',
      'vat', 'vet', 'via', 'vie', 'vow', 'wad', 'wag', 'war', 'was', 'wax',
      'way', 'web', 'wed', 'wet', 'who', 'why', 'wig', 'win', 'wit', 'woe',
      'wok', 'won', 'woo', 'wow', 'yak', 'yam', 'yap', 'yaw', 'yea', 'yes',
      'yet', 'yew', 'yin', 'you', 'zap', 'zed', 'zen', 'zip', 'zoo',
      // 4-letter words
      'able', 'ache', 'acid', 'aged', 'aide', 'also', 'area', 'army', 'away',
      'baby', 'back', 'bake', 'ball', 'band', 'bank', 'bare', 'barn', 'base',
      'bath', 'beam', 'bean', 'bear', 'beat', 'beef', 'been', 'beer', 'bell',
      'belt', 'bend', 'bent', 'best', 'bill', 'bind', 'bird', 'bite', 'blow',
      'blue', 'boat', 'body', 'bold', 'bomb', 'bond', 'bone', 'book', 'boom',
      'boot', 'bore', 'born', 'boss', 'both', 'bowl', 'bulk', 'burn', 'bush',
      'busy', 'cafe', 'cage', 'cake', 'call', 'calm', 'came', 'camp', 'card',
      'care', 'case', 'cash', 'cast', 'cave', 'cell', 'chip', 'city', 'clay',
      'club', 'clue', 'coal', 'coat', 'code', 'coin', 'cold', 'come', 'cook',
      'cool', 'cope', 'copy', 'core', 'corn', 'cost', 'crop', 'cure', 'dark',
      'data', 'date', 'dawn', 'days', 'dead', 'deal', 'dean', 'dear', 'debt',
      'deck', 'deep', 'deer', 'deny', 'desk', 'dial', 'diet', 'dirt', 'dish',
      'disk', 'dock', 'does', 'done', 'door', 'dose', 'down', 'draw', 'drew',
      'drop', 'drug', 'drum', 'dual', 'duck', 'dull', 'dust', 'duty', 'each',
      'earn', 'ease', 'east', 'easy', 'edge', 'edit', 'else', 'even', 'ever',
      'evil', 'exam', 'exit', 'face', 'fact', 'fade', 'fail', 'fair', 'fake',
      'fall', 'fame', 'farm', 'fast', 'fate', 'fear', 'feat', 'feed', 'feel',
      'feet', 'fell', 'felt', 'file', 'fill', 'film', 'find', 'fine', 'fire',
      'firm', 'fish', 'five', 'flag', 'flat', 'fled', 'flew', 'flip', 'flow',
      'fold', 'folk', 'food', 'fool', 'foot', 'ford', 'form', 'fort', 'foul',
      'four', 'free', 'from', 'fuel', 'full', 'fund', 'gain', 'game', 'gang',
      'gate', 'gave', 'gear', 'gene', 'gift', 'girl', 'give', 'glad', 'glow',
      'goal', 'goat', 'goes', 'gold', 'golf', 'gone', 'good', 'grab', 'gray',
      'grew', 'grey', 'grid', 'grin', 'grip', 'grow', 'gulf', 'hair', 'half',
      'hall', 'hand', 'hang', 'hard', 'harm', 'hate', 'have', 'head', 'heal',
      'hear', 'heat', 'heel', 'held', 'hell', 'help', 'here', 'hero', 'hide',
      'high', 'hill', 'hint', 'hire', 'hold', 'hole', 'holy', 'home', 'hope',
      'horn', 'host', 'hour', 'huge', 'hung', 'hunt', 'hurt', 'icon', 'idea',
      'inch', 'into', 'iron', 'item', 'jack', 'jail', 'jane', 'jean', 'jobs',
      'john', 'join', 'joke', 'josh', 'jump', 'june', 'jury', 'just', 'keen',
      'keep', 'kent', 'kept', 'kick', 'kill', 'kind', 'king', 'knee', 'knew',
      'knit', 'know', 'lack', 'lady', 'laid', 'lake', 'lamp', 'land', 'lane',
      'last', 'late', 'lawn', 'lead', 'leaf', 'lean', 'leap', 'left', 'lend',
      'lens', 'less', 'life', 'lift', 'like', 'limb', 'lime', 'line', 'link',
      'lion', 'list', 'live', 'load', 'loan', 'lock', 'logo', 'long', 'look',
      'loop', 'lord', 'lose', 'loss', 'lost', 'lots', 'loud', 'love', 'luck',
      'made', 'mail', 'main', 'make', 'male', 'mall', 'many', 'mark', 'mars',
      'mask', 'mass', 'mate', 'math', 'meal', 'mean', 'meat', 'meet', 'menu',
      'mere', 'mess', 'mild', 'mile', 'milk', 'mill', 'mind', 'mine', 'mint',
      'miss', 'mode', 'mood', 'moon', 'more', 'most', 'move', 'much', 'must',
      'myth', 'nail', 'name', 'navy', 'near', 'neat', 'neck', 'need', 'nest',
      'news', 'next', 'nice', 'nick', 'nine', 'node', 'none', 'noon', 'nose',
      'note', 'noun', 'odds', 'okay', 'once', 'ones', 'only', 'onto', 'open',
      'oral', 'oven', 'over', 'pace', 'pack', 'page', 'paid', 'pain', 'pair',
      'pale', 'palm', 'park', 'part', 'pass', 'past', 'path', 'peak', 'peer',
      'pick', 'pile', 'pine', 'pink', 'pipe', 'pity', 'plan', 'play', 'plea',
      'plot', 'plug', 'plus', 'poem', 'poet', 'pole', 'poll', 'pond', 'pool',
      'poor', 'pope', 'pork', 'port', 'pose', 'post', 'pour', 'pray', 'pull',
      'pump', 'pure', 'push', 'quit', 'race', 'rack', 'rage', 'raid', 'rail',
      'rain', 'rank', 'rare', 'rate', 'read', 'real', 'rear', 'rely', 'rent',
      'rest', 'rice', 'rich', 'ride', 'ring', 'riot', 'rise', 'risk', 'road',
      'rock', 'rode', 'role', 'roll', 'roof', 'room', 'root', 'rope', 'rose',
      'rule', 'rush', 'safe', 'saga', 'sage', 'said', 'sail', 'sake', 'sale',
      'salt', 'same', 'sand', 'sang', 'save', 'scan', 'seal', 'seat', 'seed',
      'seek', 'seem', 'seen', 'self', 'sell', 'send', 'sent', 'sept', 'ship',
      'shop', 'shot', 'show', 'shut', 'sick', 'side', 'sigh', 'sign', 'silk',
      'sing', 'sink', 'site', 'size', 'skin', 'slip', 'slow', 'snap', 'snow',
      'soft', 'soil', 'sold', 'sole', 'some', 'song', 'soon', 'sort', 'soul',
      'span', 'spin', 'spot', 'star', 'stay', 'stem', 'step', 'stir', 'stop',
      'such', 'suit', 'sure', 'swim', 'tail', 'take', 'tale', 'talk', 'tall',
      'tank', 'tape', 'task', 'team', 'tear', 'tech', 'tell', 'temp', 'tend',
      'tent', 'term', 'test', 'text', 'than', 'that', 'them', 'then', 'they',
      'thin', 'this', 'thus', 'tide', 'tile', 'till', 'time', 'tiny', 'tire',
      'to', 'told', 'toll', 'tone', 'took', 'tool', 'tops', 'tore', 'torn',
      'tour', 'town', 'trap', 'tree', 'trim', 'trip', 'true', 'tube', 'tune',
      'turn', 'twin', 'type', 'unit', 'upon', 'used', 'user', 'vary', 'vast',
      'very', 'vice', 'view', 'vote', 'wage', 'wait', 'wake', 'walk', 'wall',
      'want', 'ward', 'warm', 'warn', 'wash', 'wave', 'weak', 'wear', 'week',
      'well', 'went', 'were', 'west', 'what', 'when', 'whom', 'wide', 'wife',
      'wild', 'will', 'wind', 'wine', 'wing', 'wire', 'wise', 'wish', 'with',
      'woke', 'wolf', 'wood', 'wool', 'word', 'wore', 'work', 'worn', 'wrap',
      'yard', 'yeah', 'year', 'yoga', 'your', 'zero', 'zone', 'zoom',
      // 5-letter words (common crossword words)
      'about', 'above', 'abuse', 'actor', 'acute', 'admit', 'adopt', 'adult',
      'after', 'again', 'agent', 'agree', 'ahead', 'alarm', 'album', 'alert',
      'alien', 'align', 'alike', 'alive', 'alley', 'allow', 'alloy', 'alone',
      'along', 'alter', 'among', 'angel', 'anger', 'angle', 'angry', 'anime',
      'apart', 'apple', 'apply', 'arena', 'argue', 'arise', 'armor', 'array',
      'arrow', 'aside', 'asset', 'atlas', 'audio', 'audit', 'avoid', 'award',
      'aware', 'awful', 'bacon', 'badge', 'basic', 'basin', 'basis', 'beach',
      'beard', 'beast', 'begin', 'being', 'belly', 'below', 'bench', 'berry',
      'birth', 'black', 'blade', 'blame', 'blank', 'blast', 'blaze', 'bleed',
      'blend', 'bless', 'blind', 'blink', 'block', 'blond', 'blood', 'bloom',
      'blown', 'blues', 'blunt', 'blush', 'board', 'boast', 'bonus', 'booth',
      'bored', 'bound', 'brain', 'brake', 'brand', 'brass', 'brave', 'bread',
      'break', 'breed', 'brick', 'bride', 'brief', 'bring', 'broad', 'broke',
      'brook', 'broom', 'brown', 'brush', 'build', 'built', 'bunch', 'burst',
      'buyer', 'cabin', 'cable', 'cache', 'camel', 'canal', 'candy', 'cargo',
      'carry', 'carve', 'catch', 'cause', 'chain', 'chair', 'charm', 'chart',
      'chase', 'cheap', 'cheat', 'check', 'cheek', 'cheer', 'chess', 'chest',
      'chief', 'child', 'china', 'choir', 'chord', 'chose', 'chunk', 'civic',
      'civil', 'claim', 'clash', 'class', 'clean', 'clear', 'clerk', 'click',
      'cliff', 'climb', 'cling', 'clock', 'close', 'cloth', 'cloud', 'clown',
      'coach', 'coast', 'color', 'colon', 'comet', 'coral', 'couch', 'cough',
      'could', 'count', 'court', 'cover', 'crack', 'craft', 'crane', 'crash',
      'crawl', 'crazy', 'cream', 'creek', 'creep', 'crest', 'crime', 'crisp',
      'cross', 'crowd', 'crown', 'crude', 'cruel', 'crush', 'curve', 'cycle',
      'daily', 'dairy', 'dance', 'dated', 'dealt', 'death', 'debut', 'decay',
      'decor', 'delay', 'demon', 'dense', 'depot', 'depth', 'derby', 'desk',
      'devil', 'diary', 'digit', 'dirty', 'disco', 'ditch', 'diver', 'dizzy',
      'dodge', 'doing', 'donor', 'doubt', 'dough', 'dozen', 'draft', 'drain',
      'drama', 'drank', 'drawn', 'dread', 'dream', 'dress', 'dried', 'drift',
      'drill', 'drink', 'drive', 'drown', 'drunk', 'dying', 'eager', 'eagle',
      'early', 'earth', 'eaten', 'eater', 'edge', 'eight', 'elbow', 'elder',
      'elect', 'elite', 'email', 'ember', 'empty', 'ended', 'enemy', 'enjoy',
      'enter', 'entry', 'equal', 'equip', 'erase', 'error', 'essay', 'ethos',
      'event', 'every', 'exact', 'exert', 'exist', 'extra', 'fable', 'faced',
      'facet', 'faith', 'false', 'famed', 'fancy', 'fault', 'favor', 'feast',
      'fence', 'ferry', 'fetch', 'fever', 'fiber', 'field', 'fiery', 'fifth',
      'fifty', 'fight', 'final', 'first', 'fixed', 'flame', 'flash', 'flask',
      'fleet', 'flesh', 'float', 'flock', 'flood', 'floor', 'flora', 'flour',
      'flown', 'fluid', 'flush', 'flute', 'focus', 'foggy', 'force', 'forge',
      'forth', 'forty', 'forum', 'found', 'frame', 'frank', 'fraud', 'freak',
      'fresh', 'fried', 'front', 'frost', 'fruit', 'fully', 'funny', 'fuzzy',
      'ghost', 'giant', 'given', 'gland', 'glare', 'glass', 'gleam', 'glide',
      'globe', 'glory', 'gloss', 'glove', 'going', 'golden', 'goods', 'goose',
      'grace', 'grade', 'grain', 'grand', 'grant', 'grape', 'graph', 'grasp',
      'grass', 'grave', 'great', 'greed', 'greek', 'green', 'greet', 'grief',
      'grill', 'grind', 'groan', 'groom', 'gross', 'group', 'grove', 'growl',
      'grown', 'guard', 'guess', 'guest', 'guide', 'guild', 'guilt', 'guise'
    ];

    // Add all sample words
    for (const word of sampleWords) {
      this.addWord(word);
    }
  }

  // Clear the dictionary
  clear(): void {
    this.words.clear();
    this.save();
  }

  // Export all words as flat array
  getAllWords(): string[] {
    const allWords: string[] = [];
    this.words.forEach(bucket => {
      allWords.push(...bucket);
    });
    return allWords.sort();
  }
}

// Singleton instance
let dictionaryInstance: Dictionary | null = null;

export function getDictionary(): Dictionary {
  if (!dictionaryInstance) {
    dictionaryInstance = new Dictionary();
  }
  return dictionaryInstance;
}
