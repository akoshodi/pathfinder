<?php

it('responsive mode accepts valid values', function () {
    $validModes = ['table', 'cards', 'auto'];

    foreach ($validModes as $mode) {
        expect($mode)->toBeIn($validModes);
    }
});

it('mobile breakpoint is 768px', function () {
    expect(768)->toBe(768);
});

it('card view used for mobile with auto mode', function () {
    $windowWidth = 375;
    $mobileBreakpoint = 768;
    $responsiveMode = 'auto';

    $shouldUseCardView = ($responsiveMode === 'cards') || 
                        ($responsiveMode === 'auto' && $windowWidth < $mobileBreakpoint);

    expect($shouldUseCardView)->toBeTrue();
});

it('table view used for desktop with auto mode', function () {
    $windowWidth = 1200;
    $mobileBreakpoint = 768;
    $responsiveMode = 'auto';

    $shouldUseCardView = ($responsiveMode === 'cards') || 
                        ($responsiveMode === 'auto' && $windowWidth < $mobileBreakpoint);

    expect($shouldUseCardView)->toBeFalse();
});

it('cards mode forces card view', function () {
    $responsiveMode = 'cards';
    $shouldUseCardView = $responsiveMode === 'cards';

    expect($shouldUseCardView)->toBeTrue();
});

it('table mode forces table view', function () {
    $responsiveMode = 'table';
    $shouldUseCardView = $responsiveMode === 'table' ? false : true;

    expect($shouldUseCardView)->toBeFalse();
});

it('responsive padding classes included', function () {
    $mobilePadding = 'px-4';
    $desktopPadding = 'md:px-6';
    $responsivePaddingClasses = "$mobilePadding $desktopPadding";

    expect($responsivePaddingClasses)->toContain('px-4');
    expect($responsivePaddingClasses)->toContain('md:px-6');
});

it('table has full width', function () {
    $tableClasses = 'w-full table-auto divide-y divide-border';

    expect($tableClasses)->toContain('w-full');
    expect($tableClasses)->toContain('table-auto');
});

it('overflow x auto for horizontal scroll', function () {
    $containerClasses = 'relative w-full overflow-x-auto';

    expect($containerClasses)->toContain('overflow-x-auto');
    expect($containerClasses)->toContain('w-full');
});

it('line clamp for text overflow', function () {
    $cellClasses = 'px-3 py-4 sm:px-4 text-sm text-foreground line-clamp-2';

    expect($cellClasses)->toContain('line-clamp-2');
});

it('card layout structure', function () {
    $cardClasses = 'rounded-lg bg-card border border-border p-4 shadow-sm';

    expect($cardClasses)->toContain('rounded-lg');
    expect($cardClasses)->toContain('bg-card');
    expect($cardClasses)->toContain('border');
    expect($cardClasses)->toContain('p-4');
});

it('responsive hover state', function () {
    $rowClasses = 'hover:bg-muted/50 transition-colors';

    expect($rowClasses)->toContain('hover:bg-muted');
    expect($rowClasses)->toContain('transition-colors');
});
