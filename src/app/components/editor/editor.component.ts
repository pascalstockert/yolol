import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { faPlay, faPause, faStepForward } from '@fortawesome/free-solid-svg-icons';
import { Chip, YazurService } from '../../services/yazur.service';
import { split } from 'ts-node';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit, AfterViewInit {

  @Input() sectionData;

  @ViewChild( 'editor' ) editorRef: ElementRef<HTMLDivElement>;
  @ViewChild( 'editorOverlay' ) editorOverlayRef: ElementRef<HTMLDivElement>;

  lineCount = 1;
  lineLabels = [1];
  currentLine = 1;
  hasFocus = false;
  editorContent = '';
  initialContent = [];

  stepIcon = faStepForward;

  chip: Chip = new Chip();

  chipIntervalAction: () => void = this.startInterval;
  chipIntervalActionIcon = faPlay;
  chipIntervalSubscription;

  darkMode = false;

  constructor( private yazurService: YazurService,
               private settingsService: SettingsService ) {
    this.chip.lineChange.subscribe( lineChange => {
      this.currentLine = lineChange.nextLine;
    } );
  }

  ngOnInit(): void {
    this.settingsService.darkMode.subscribe( darkMode => {
      this.darkMode = darkMode;
    } );
  }

  ngAfterViewInit(): void {
    if ( 'initial_content' in this.sectionData.primary ) {
      this.initialContent = this.sectionData.primary.initial_content;
      this.setInitialContent();
    }
    if ( 'globals' in this.sectionData.primary ) {
      this.setGlobals( this.sectionData.primary.globals );
    }
    this.editorContent = this.editorRef.nativeElement.innerHTML;
    this.editorRef.nativeElement.innerHTML = this.editorContent;
    this.checkHeight();
    this.setContent();
  }

  setInitialContent(): void {
    let initialContentString = '';
    for ( const line of this.initialContent ) {
      if ( !!line ) {
        initialContentString += `${ line.text }\n`;
      }
    }
    const lines = initialContentString
      .split('\n')
      .map( line => {
        if ( line !== '' ) {
          return '<div>' + line + '</div>';
        }
        return line;
      } );
    this.editorRef.nativeElement.innerHTML = lines.join('');
  }

  setGlobals( globals: any[] ): void {
    globals.forEach( globalObject => {
      const globalFields = globalObject.text.split( ',' );
      globalFields.forEach( stringTuple => {
        const splitTuple = stringTuple.split( '=' );
        // TODO fix hard-coded type/subtype of globals
        this.chip.localEnv.global[ ':' + splitTuple[0] ] = { type: 3, subtype: 1, value: splitTuple[1] };
      } );
    } );
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardDown( keyEvent: KeyboardEvent ): void {
    if ( this.hasFocus ) {
      // Optional key behavior specification
      switch ( keyEvent.key ) {
        case 'Tab':
          keyEvent.preventDefault();
          break;
        case 'Enter':
          if ( this.lineCount === 20 ) {
            keyEvent.preventDefault();
          }
      }

      // Remove rendering of text from regular event-loop
      setTimeout( () => {
        this.checkHeight();
        this.editorContent = this.editorRef.nativeElement.innerHTML;
        this.setContent();
      } );
    }
  }

  checkHeight(): void {
    this.lineCount = this.editorRef.nativeElement.offsetHeight / 24;
    const newLineLabels = [];
    for ( let i = 1; i <= this.lineCount; i++ ) {
      newLineLabels.push( i );
    }
    this.lineLabels = newLineLabels;
  }

  setContent(): void {
    const lines = [];
    this.getWrittenCode().forEach(  ( line, i ) => {
      lines.push( '<div>' + this.chip.generateSpans( line, this.chip.lex( line, i ) ) + '</div>' );
    } );
    console.log(lines.join(''));
    this.editorOverlayRef.nativeElement.innerHTML = lines.join('');
  }

  setFocus( value: boolean ): void {
    this.hasFocus = value;
  }

  getWrittenCode(): string[] {
    const lines = [];
    // @ts-ignore
    for ( const line of this.editorRef.nativeElement.childNodes ) {
      lines.push( line.innerText === '\n' ? '' : line.textContent );
    }
    return lines as string[];
  }

  interpretLine(): void {
    try {
      const lines = [];
      this.getWrittenCode().forEach(  ( line, i ) => {

        const lexed = this.chip.lex( line );

        lines.push( this.chip.parse( lexed ) );
      } );
      this.chip.setParsed( lines );
      this.chip.interpret();
      if ( this.chip.localEnv.nextLine > this.lineCount ) {
        this.chip.setCurrentLine( 1 );
      }
    } catch ( e ) {
      console.error( e );
      this.setCurrentLine( this.currentLine + 1 );
    }
  }

  setCurrentLine( nextLine: number ): void {
    this.chip.setCurrentLine( nextLine );
  }

  getChipGlobals(): any {
    return Object.keys( this.chip.localEnv.global );
  }

  getChipVars(): any {
    return Object.keys( this.chip.localEnv.vars );
  }

  scrolled( event ): void {
    this.editorOverlayRef.nativeElement.scrollLeft = event.srcElement.scrollLeft;
  }

  startInterval(): void {
    this.chipIntervalAction = this.stopInterval;
    this.chipIntervalActionIcon = faPause;
    this.chipIntervalSubscription = this.yazurService.chipTimer.subscribe( () => {
      this.interpretLine();
    } );
  }

  stopInterval(): void {
    this.chipIntervalAction = this.startInterval;
    this.chipIntervalActionIcon = faPlay;
    this.chipIntervalSubscription.unsubscribe();
  }

}
